const chalk = require('chalk');
const gradient = require('gradient-string').default;
const boxen = require('boxen');

const theme = {
    primary: '#00d2ff',
    secondary: '#3a7bd5',
    error: '#ff4b2b',
    success: '#11998e',
    warning: '#f8ff00'
};

const logo = `
 ███▄    █  █    ██  ▄▄▄█████  ▄████▄   █    ██  ▄▄▄█████ ▄▄▄█████ ▓█████ 
 ██ ▀█   █  ██  ▓██▒ ▓  ██▒ ▓▒▒██▀ ▀█   ██  ▓██▒ ▓  ██▒ ▓▒▓  ██▒ ▓▒ ▓█   ▀ 
▓██  ▀█ ██▒▓██  ▒██░ ▒ ▓██░ ▒░▒▓█    ▄ ▓██  ▒██░ ▒ ▓██░ ▒░▒ ▓██░ ▒░ ▒███   
▓██▒  ▐▌██▒▓▓█  ░██░ ░ ▓██▓ ░ ▒▓▓▄ ▄██▒▓▓█  ░██░ ░ ▓██▓ ░ ░ ▓██▓ ░  ▒▓█  ▄ 
▒██░   ▓██░▒▒█████▓    ▒██▒ ░ ▒ ▓███▀ ░▒▒█████▓    ▒██▒ ░   ▒██▒ ░  ░▒████▒
░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒    ▒ ░░   ░ ░▒ ▒  ░░▒▓▒ ▒ ▒    ▒ ░░     ▒ ░░    ░░ ▒░ ░
░ ░░   ░ ▒░░░▒░ ░ ░      ░      ░  ▒   ░░▒░ ░ ░      ░        ░      ░ ░  ░
   ░   ░ ░  ░░░ ░ ░    ░      ░          ░░░ ░ ░    ░        ░         ░   
         ░    ░               ░ ░          ░                           ░  ░
                              ░                                            
`;

function printHeader() {
    console.clear();
    const grad = gradient(['#00c6ff', '#0072ff']);
    console.log(grad.multiline(logo));
    console.log(boxen(chalk.bold('SINTEL-HP: INDO OSINT TOOLSET v1.0'), {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'cyan',
        float: 'center'
    }));
}

function printSuccess(msg) {
    console.log(chalk.hex(theme.success)('✔ ') + msg);
}

function printError(msg) {
    console.log(chalk.hex(theme.error)('✖ ') + msg);
}

function printInfo(msg) {
    console.log(chalk.hex(theme.primary)('ℹ ') + msg);
}

module.exports = {
    printHeader,
    printSuccess,
    printError,
    printInfo,
    theme
};
