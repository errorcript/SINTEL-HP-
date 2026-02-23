#!/usr/bin/env node

const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const { printHeader, printSuccess, printError, printInfo, theme } = require('./lib/ui');
const { getPhoneInfo, searchScamDB } = require('./lib/scanner');
const { createTrackingLink } = require('./lib/logger');

async function main() {
    printHeader();

    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'Apa yang ingin Anda lakukan?',
            choices: [
                'Lacak Detail Nomor HP (Carrier/Info)',
                'Cek Database Penipu (Search Dorks)',
                'Tarik Data GetContact (Manual Guide)',
                'Buat Link Jebakan (IP Logger)',
                'Keluar'
            ]
        }
    ];

    const answer = await inquirer.prompt(questions);

    switch (answer.action) {
        case 'Lacak Detail Nomor HP (Carrier/Info)':
            await handlePhoneLookup();
            break;
        case 'Cek Database Penipu (Search Dorks)':
            await handleScamSearch();
            break;
        case 'Tarik Data GetContact (Manual Guide)':
            handleGetContactGuide();
            break;
        case 'Buat Link Jebakan (IP Logger)':
            await handleLinkLogger();
            break;
        case 'Keluar':
            console.log(chalk.yellow('Terima kasih telah menggunakan SINTEL-HP. Hati-hati di internet!'));
            process.exit();
    }
}

async function handlePhoneLookup() {
    const { number } = await inquirer.prompt([
        {
            type: 'input',
            name: 'number',
            message: 'Masukkan nomor HP (contoh: 08123456789):',
            validate: (input) => input.length >= 10 ? true : 'Nomor terlalu pendek.'
        }
    ]);

    const spinner = ora('Mencari informasi nomor...').start();
    const info = await getPhoneInfo(number);
    spinner.stop();

    if (info.valid) {
        console.log('\n' + chalk.bold.underline('Hasil Informasi:'));
        console.log(`Format: ${chalk.cyan(info.formatted)}`);
        console.log(`Negara: ${chalk.cyan(info.country)}`);
        console.log(`Provider: ${chalk.cyan(info.carrier)}`);
        console.log(`Tipe Line: ${chalk.cyan(info.type)}`);
        printSuccess('Informasi dasar berhasil ditarik.');
    } else {
        printError('Nomor tidak valid atau tidak terdeteksi.');
    }

    console.log('\n');
    main();
}

async function handleScamSearch() {
    const { number } = await inquirer.prompt([{ type: 'input', name: 'number', message: 'Masukkan nomor HP penipu:' }]);
    const dorks = await searchScamDB(number);

    console.log('\x1Bc');
    printHeader();
    printInfo('Salin dan tempel query berikut di Google/DuckDuckGo untuk mencari riwayat penipuan:');

    dorks.forEach(dork => {
        console.log(chalk.hex(theme.warning)(`> ${dork}`));
    });

    console.log(chalk.dim('\nSearching database otomatis masih dalam pengembangan...'));
    main();
}

function handleGetContactGuide() {
    console.log('\n' + chalk.bold.bgBlue(' MANUAL GETCONTACT OSINT '));
    console.log('1. Buka aplikasi GetContact di HP lo.');
    console.log('2. Search nomor penipu tersebut.');
    console.log('3. Lihat bagian "Tags" (Penanda).');
    console.log('4. Jika ada tag seperti "Penipu", "Scammer", "Tukang Bojong", segera amankan bukti.');
    console.log('5. Cek apakah ada nama asli di salah satu tag tersebut.');
    printInfo('Gunakan informasi ini untuk melapor ke bank penipu (cekrekening.id)');
    main();
}

async function handleLinkLogger() {
    console.log(chalk.yellow('\nFitur ini membantu Anda mendapatkan Alamat IP & Lokasi Penipu.'));
    const { url } = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Masukkan URL tujuan asli (misal: imagebb.com/bukti-transfer):',
            default: 'https://imgbb.com'
        }
    ]);

    const result = await createTrackingLink(url);
    printSuccess('Link Pelacakan Berhasil Dibuat (Simulasi)');
    console.log(`Gunakan: ${chalk.bold.underline('https://grabify.link/')}`);
    console.log(`Token Pelacakan: ${chalk.green('ID-' + Math.random().toString(36).substr(2, 9).toUpperCase())}`);
    console.log(chalk.dim('Tips: Masukkan URL tadi ke Grabify.link untuk mendapatkan real link.'));
    main();
}

main().catch(err => {
    console.error(err);
});
