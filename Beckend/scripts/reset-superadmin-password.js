/**
 * Reset password for superadmin (barzupano@gmail.com).
 * Usage: node scripts/reset-superadmin-password.js [newPassword]
 * Default password: Admin123!
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/client");

const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || "barzupano@gmail.com";
const NEW_PASSWORD = process.argv[2] || "Admin123!";

async function main() {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { email: SUPERADMIN_EMAIL.toLowerCase() },
  });
  if (!user) {
    console.error(`User not found: ${SUPERADMIN_EMAIL}`);
    process.exit(1);
  }
  const hash = await bcrypt.hash(NEW_PASSWORD, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hash },
  });
  console.log(`Password reset for ${SUPERADMIN_EMAIL}`);
  console.log(`New password: ${NEW_PASSWORD}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
