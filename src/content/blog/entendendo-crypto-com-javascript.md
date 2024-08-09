---
title: 'Entendendo crypto com javascript'
pubDate: '2024-08-09'
---

# Objetivos 🎯

Esclarecer conceitos de _crypto_ utilizados em aplicativos de carteiras digitais e exemplificar como estes códigos funcionam por debaixo dos panos.

> O post seguirá os exemplos do site [learnmeabitcoin.com](https://learnmeabitcoin.com/) feitos em ruby e irá portar-los para javascript (node).

---

## Conceitos 📋

**Frase Mnemônica (Mnemonic Seed)**:

É uma frase contendo um conjunto de palavras que serão usadas para criação/recuperação de uma conta ou carteira digital.

**Semente (Seed):**

É um valor alfanumérico gerado através da frase mnemônica.

**Chave pública e privada:**

São chaves criadas através de uma seed. A chave privada é responsável por assinar mensagens, e a pública é responsável por validar pacotes.

**Assinatura:**

Valor alfanumérico gerado com a a chave privada para garantir autenticidade de mensagens.

---

# Tutorial 🔭

### Passo-a-passo:

1. Gerar frase mnemônica;
2. Gerar seed;
3. Gerar chave pública e privada;
4. Assinar mensagem e verificar assinatura.

### 1. Gerar frase mnemônica:

```js
import { readFileSync } from 'node:fs'
import { createHash, randomBytes } from 'node:crypto'

// Lista de palavras para seed
// Seguir para exemplo https://github.com/bitcoin/bips/blob/master/bip-0039/portuguese.txt

/**
 * Nesse exemplo, o arquivo `words.json` é uma lista de palavras
 * @example
 * [
 *  "abacate",
 *  "abaixo",
 *  ...
 * ]
 */
const words = JSON.parse(readFileSync('./words.json', { encoding: 'utf-8' }))

/**
 * Transforma buffer hexadecimal em array de binário
 * @param {Buffer} buf
 * @returns {string[]}
 * @example
 * const buffer = new Buffer().fill(0xb4)
 * bufferToBinary(buffer) // -> ['10110100']
 */
// 
const bufferToBinary = (buf) =>
  [...buf.values()].map((byte) => Number(byte).toString(2).padStart(8, '0'))

// Calcular entropia inicial de 128 bits
const bytes = randomBytes(16)

// Organizar valor de entropia em array de binário
const entropy = bufferToBinary(bytes)

// Aplicar hash (SHA256) na entropia para criar checksum
const hashedEntropy = bufferToBinary(
  createHash('sha256').update(entropy.join('')).digest()
)

// Recuperar a quantidade de bits necessária para usar como checksum
// Regra: 1bit a cada 32 bytes
const size = entropy.join('').length / 32
const checksum = hashedEntropy.join('').slice(0, size)

// Agrupar entropia + checksum em formato de 11bits
const full = [...entropy, checksum]
const pieces = full.join('').match(/\d{11}/g)

// Popular frase mnemônica
const sentence = []
for (const piece of pieces || []) {
  sentence.push(words[parseInt(piece, 2) - 1])
}

// Ex: entortar ramal ralado copeiro grunhido fretar inerente acima palheta minoria adentro granada
console.log('Frase mnemônica:', sentence.join(' '))
```

### 2. Gerar seed através de frase:

```js
import { pbkdf2 } from 'node:crypto'

// Frase mnemônica de exemplo
const mnemonic = 'patente derramar secar edificar galho talher'
const passphrase = '' // Senha opcional

const salt = `mnemonic${passphrase}` // "mnemonic" (padrão) + senha
const iterations = 2048
const keylength = 64

// Utilizando pbkdf2 para criar uma seed de 64 bytes
pbkdf2(mnemonic, salt, iterations, keylength, 'sha512', (err, derivedKey) => {
  if (err) throw err
  console.log('Mnemonic seed:', derivedKey.toString('hex')) // Ex: 'ee933c...8c5d00'
})
```

### 3. Gerar chave pública e privada mestre:

```js
import { createHmac, createECDH } from 'crypto'

// Seed gerada através de frase mnemônica
const seed =
  'ee933cc9789f0f3b2377883d193aa717961db37b317f798f9b2f7ad763fbda24' +
  '115e37e4f7eca541f7feebdfafa8e8f9a20ea9f632710f155a63a1a6c88c5d00'

// Criar hash (SHA512) de sua seed usando a seed da aplicação como key
// Ex: 'Bitcoin seed'
const hmac = createHmac('sha512', 'Bitcoin seed')
  .update(Buffer.from(seed, 'hex'))
  .digest()

const masterPrivateKey = hmac.subarray(0, 32)
const masterChainCode = hmac.subarray(32, 64)

// Gerar chaves pública e privada
const ecdh = createECDH('secp256k1')
ecdh.setPrivateKey(masterPrivateKey)

console.log('Chave privada:', ecdh.getPrivateKey('hex'))
console.log('Chave pública:', ecdh.getPublicKey('hex', 'uncompressed'))
```

### 4. Assinar dados usando ECDSA:

```js
import {
  createSign,
  createECDH,
  createVerify,
  createPublicKey,
  createPrivateKey,
} from 'node:crypto'

// Criar objeto de chaves pública e privada
// Referência: https://zanechua.com/blog/generate-ec-private-public-key-pair-node/

/**
 * Cria par de chaves pública e privada em formato der
 *
 * @param {string} rawPublicHexKey hex
 * @param {string} rawPrivateHexKey hex
 */
function buildKeyPair(rawPublicHexKey, rawPrivateHexKey) {
  const pubKey = Buffer.from(rawPublicHexKey, 'hex')
  const privKey = Buffer.from(rawPrivateHexKey, 'hex')

  const pubA = Buffer.from(
    '3056301006072A8648CE3D020106052B8104000A034200',
    'hex'
  )
  const publicKeyDer = Buffer.concat([pubA, pubKey])
  const publicKeyObject = createPublicKey({
    key: publicKeyDer,
    type: 'spki',
    format: 'der',
  })

  const privA = Buffer.from('30740201010420', 'hex')
  const privB = Buffer.from('A00706052B8104000AA144034200', 'hex')
  const privateKeyDer = Buffer.concat([privA, privKey, privB, pubKey])
  const privateKeyObject = createPrivateKey({
    type: 'sec1',
    format: 'der',
    key: privateKeyDer.toString('hex'),
    encoding: 'hex',
  })

  return { publicKey: publicKeyObject, privateKey: privateKeyObject }
}

// Recuperar chave privada mestre
const masterPrivateKey = Buffer.from(
  '07acbf6a29fc19b91d43d1bc9da2aa9588a1fd3fdad9c33681fee523c16f8d03', // Chave de exemplo
  'hex'
)
const ecdh = createECDH('secp256k1')
ecdh.setPrivateKey(masterPrivateKey)

const rawPublicKey = ecdh.getPublicKey('hex', 'uncompressed')
const rawPrivateKey = ecdh.getPrivateKey('hex')

// Criando par de chaves no formato der
const { publicKey, privateKey } = buildKeyPair(rawPublicKey, rawPrivateKey)

// Assinando mensagem
const message = 'Hello world'
const signature = createSign('sha256').update(message).sign(privateKey)
console.log('Assinatura:', signature.toString('hex'))

// Verificando assinatura
const isVerified = createVerify('sha256')
  .update(message)
  .verify(publicKey, signature)
console.log('Verificado:', isVerified)
```
