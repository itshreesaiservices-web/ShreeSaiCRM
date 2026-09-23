const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

console.log('🚀 Starting ClientBridge Setup...');

if (!fs.existsSync(envPath)) {
  console.log('📝 .env file not found. Copying from .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Created .env file.');
  
  rl.question('⚠️ Do you want to pause and edit your .env file now with your database credentials? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('⏸️  Please open the .env file in your editor, add your Supabase credentials, and then run `npx prisma generate` manually.');
      process.exit(0);
    } else {
      runPrisma();
    }
  });
} else {
  console.log('✅ .env file already exists.');
  runPrisma();
}

function runPrisma() {
  try {
    console.log('⚙️ Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate Prisma Client. Check your .env file.');
    process.exit(1);
  }
  process.exit(0);
}
