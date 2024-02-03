---
title: "Instalar driver de wifi no ubuntu server"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
---

### Preparando ambiente
1. Faça o boot da ISO do ubuntu server em um pendrive;
2. Acesse o [site](https://packages.ubuntu.com/focal/wpasupplicant) para baixar o driver do `wpasupplicant`;
3. Também é preciso baixar as seguintes dependências:
	1. [libnl-3-200](https://packages.ubuntu.com/focal/libnl-3-200)
	2. [libnl-genl-3-200](https://packages.ubuntu.com/focal/libnl-genl-3-200)
	3. [libnl-route-3-200](https://packages.ubuntu.com/focal/libnl-route-3-200)
	4. [libpcsclite1](https://packages.ubuntu.com/focal/libpcsclite1)
4. Atualize as permissões da partição da ISO para poder salvar os pacotes:
   ```bash
   > sudo chmod 777 -R /media/$USER/writable
   ```
1. Copie os pacotes para essa pasta.

### Instalando ISO junto com pacotes
Depois de escolher suas opções de teclado, na etapa de configuração de redes, abra a aba de ajuda (`Help`) e selecione para abrir um sessão de shell (`Enter shell`).

1. Rode o comando para visualizar dispositivos:
   ```bash
   > lsblk
   NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
   ...
   sda           8:0    0  14.8G  0 disk 
   └─sda1        8:1    0  14.8G  0 part
   └─sda2        8:1    0   9.4M  0 part
   └─sda3        8:1    0   256M  0 part
   ```

2. Monte a partição `writable` para poder ter acesso aos pacotes:
   > Aviso: aqui será usado o `sdb2` como teste, porém pode variar

   ```bash
   > mount /dev/sdb2 /mnt
   ```

3. Instale os pacotes:
   ```bash
   > cd /mnt
   > dpkg -i *
   ```

4. Configure as configurações da conexão no arquivo `/etc/netplan/00-installer-config.yaml`:
   ```yaml
   version: 2
   wifis:
     wlp1s0:
       dhcp4: no
       addresses: [192.168.0.1/24]      # IP estático
       gateway4: 192.168.0.1            # IP do gateway de sua rede
       nameservers:
         addresses: [8.8.8.8, 8.8.4.4]
        access-points:
          "WIFI-SSID":                  # Nome do wifi
            password: "WIFI-PASSWORD"   # Senha do wifi
   ```
   
5. Rode os comandos para aplicar as configurações da rede:
   ```bash
   > netplan generate
   > netplan apply
   ```
