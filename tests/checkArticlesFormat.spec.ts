import { resolve } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { describe, it, beforeAll, expect } from 'vitest'

interface CustomMatchersProps {
  post: string
  expected: boolean
  property?: string
}

interface CustomMatchers<R = unknown> {
  hasProperty(props: CustomMatchersProps): R
  hasContent(props: CustomMatchersProps): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  hasProperty(recieved, { post, expected, property }) {
    if (recieved === expected) {
      return {
        pass: true,
        message: () => 'Passed',
      }
    }

    return {
      message: () =>
        `\x1B[31m'${post}'\x1B[39m file should have property \x1B[32m${property}\x1B[39m`,
      pass: false,
    }
  },
  hasContent(recieved, { post, expected }) {
    if (recieved === expected) {
      return {
        pass: true,
        message: () => 'Passed',
      }
    }

    return {
      message: () =>
        `\x1B[31m'${post}'\x1B[39m file should have some \x1B[32mcontent\x1B[39m`,
      pass: false,
    }
  },
})

let postsFolder: string[]
const postsFolderPath = resolve(__dirname, '..', 'src', 'content', 'blog')

describe('Check if all posts have the correct structure', () => {
  const getArticles = () =>
    readdirSync(postsFolderPath).filter((name) => name.includes('.md'))

  const hasTitle = (post) => /title:/g.test(post)
  const hasPubDate = (post) => /pubDate:/g.test(post)
  const hasContent = (post) => post !== '' && !/^\s*$/g.test(post)

  beforeAll(() => {
    postsFolder = getArticles()
  })

  it('Check if post have the title Info', () => {
    postsFolder.forEach((postName) => {
      const post = readFileSync(`${postsFolderPath}/${postName}`, 'utf8')
      expect(hasTitle(post)).hasProperty({
        post: postName,
        expected: true,
        property: 'title',
      })
    })
  })

  it('Check if post have the PubDate Info', () => {
    postsFolder.forEach((postName) => {
      const post = readFileSync(`${postsFolderPath}/${postName}`, 'utf8')
      expect(hasPubDate(post)).hasProperty({
        post: postName,
        expected: true,
        property: 'pubDate',
      })
    })
  })

  it('Check if post have some Content', () => {
    const separator = '---'
    postsFolder.forEach((postName) => {
      const post = readFileSync(`${postsFolderPath}/${postName}`, 'utf8').split(
        separator
      )
      expect(hasContent(post[2].trim())).hasContent({
        post: postName,
        expected: true,
      })
    })
  })
})
