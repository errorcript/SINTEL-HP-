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
        console.log(`Nama Asli (Truecaller): ${chalk.yellow(info.truecallerName)}`);
        printSuccess('Informasi dasar berhasil ditarik.');
    } else {
        printError('Nomor tidak valid atau tidak terdeteksi.');
    }

    console.log('\n');
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
    console.log('\n' + chalk.bold.bgRed(' REAL IP LOGGER & LOCATION TRACKER '));
    console.log(chalk.yellow('Fitur Tracking IP sekarang udah FULL VERSION pindah ke Dashboard Web. Ga usah pake Discord lagi!'));
    console.log(chalk.gray('Buka website tool kita di Vercel buat ngecek dashboard Real-Timenya langsung jalan di Browser.'));

    const { domain, url } = await inquirer.prompt([
        {
            type: 'input',
            name: 'domain',
            message: 'Masukkan Domain Web Vercel lu (contoh: sintel.vercel.app / sintel.neoma.space):',
            default: 'sintel.vercel.app'
        },
        {
            type: 'input',
            name: 'url',
            message: 'Masukkan URL target asli (buat ngalihin targetnya doang) [Biarkan kosong utk google]:',
            default: 'https://google.com'
        }
    ]);

    // Ensure domain has https protocol formatting
    const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const topicId = 'sintel_' + Math.random().toString(36).substring(2, 10);
    const tBase = Buffer.from(url).toString('base64');

    // Fallback if they run in localhost / CLI without Web
    const trapLink = `${baseUrl}/api/trap?topic=${topicId}&t=${tBase}`;
    let shortLink = trapLink;

    const spinner = ora('Membuat link jebakan pendek...').start();
    try {
        const axios = require('axios');
        const res = await axios.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(trapLink)}`);
        if (res.data && res.data.shorturl) shortLink = res.data.shorturl;
    } catch (e) { }
    spinner.stop();

    printSuccess('Link Pelacakan Berhasil Dibuat (REAL)!');
    console.log(`\n🕸️ Link Jebakan: ${chalk.green.bold.underline(shortLink)}`);
    console.log(`⏱️ Cek Hasil Klik Di: ${chalk.blue.underline('Buka Web SINTEL-HP lu, masuk ke Menu Live GPS Tracker')}`);
    console.log(chalk.dim('\nTips: Selama target buka shortlink, perangkat & lokasi dia auto-kerekam!'));

    main();
}

main().catch(err => {
    console.error(err);
});
