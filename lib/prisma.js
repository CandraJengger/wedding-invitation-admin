import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient({log:["query"]});
// export default prisma;

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({log:["query"]});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({log: ["query"]});
  }

  prisma = global.prisma;
}

export default prisma;