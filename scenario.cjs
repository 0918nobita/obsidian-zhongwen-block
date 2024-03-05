function url() {
    return 'http://localhost:5173';
}

async function action(page) {
    await page.click('[id="actionButton"]');
}

async function back(page) {
    await page.click('[id="backButton"]');
}

module.exports = {
    url,
    action,
    back,
};
