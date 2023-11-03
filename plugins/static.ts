/// <reference path="../global.d.ts" />
import fastifyStatic from "@fastify/static"
import type { FastifyInstance } from "fastify"

export default async function (fastify: FastifyInstance, opts) {
  fastify.register(fastifyStatic, {
    root: `${fastify.platformatic.configManager.dirname}/public`,
    prefix: "/public", // optional: default '/'
    index: false,
    prefixAvoidTrailingSlash: true,
    list: {
      format: 'html',
      render: (dirs, files) => {
        return `
    <html><body>
    <ul>
      ${dirs.map((dir) => `<li><a href="${dir.href}">${dir.name}</a></li>`).join('\n  ')}
    </ul>
    <ul>
      ${files
            .map((file) => `<li><a href="${file.href}" target="_blank">${file.name}</a></li>`)
            .join('\n  ')}
    </ul>
    </body></html>
    `
      }
    }
  })
}
