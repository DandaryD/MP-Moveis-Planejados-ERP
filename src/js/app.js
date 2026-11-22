
'use strict';

async function initializeApp() {
    const versionElement = document.getElementById('app-version');

    try {
        versionElement.textContent =
            `Versão ${await window.mpAPI.getVersion()}`;
    } catch (error) {
        versionElement.textContent = 'Versão indisponível';
        console.error('Erro ao consultar versão:', error);
    }

    configurarNavegacao();
}

function configurarNavegacao() {
    const main = document.querySelector('.main-content');
    const topbarTitle = document.querySelector('.topbar h2');
    const breadcrumb = document.querySelector('.breadcrumb');

    const dashboardElements = [
        document.querySelector('.welcome'),
        document.querySelector('.section-heading'),
        document.querySelector('.stats-grid'),
        document.querySelector('.content-card')
    ];

    const footer = document.querySelector('.footer');

    const moduleContainer = document.createElement('div');
    moduleContainer.id = 'module-container';
    moduleContainer.hidden = true;

    main.insertBefore(moduleContainer, footer);

    function abrirDashboard() {
        dashboardElements.forEach(element => {
            if (element) element.hidden = false;
        });

        moduleContainer.hidden = true;
        topbarTitle.textContent = 'Painel de controle';
        breadcrumb.textContent = 'MP / Dashboard';

        atualizarMenu('Dashboard');
    }

    function abrirClientes() {
        dashboardElements.forEach(element => {
            if (element) element.hidden = true;
        });

        moduleContainer.hidden = false;
        topbarTitle.textContent = 'Gestão de clientes';
        breadcrumb.textContent = 'MP / Clientes';

        window.Clientes.render(moduleContainer);
        atualizarMenu('Clientes');
    }

    function atualizarMenu(nomeAtivo) {
        document.querySelectorAll('.menu-item').forEach(botao => {
            botao.classList.toggle(
                'active',
                botao.textContent.trim().includes(nomeAtivo)
            );
        });
    }

    document.querySelectorAll('.menu-item').forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.textContent.trim();

            if (nome.includes('Dashboard')) {
                abrirDashboard();
                return;
            }

            if (nome.includes('Clientes')) {
                abrirClientes();
                return;
            }

            alert(`O módulo "${nome}" será implementado nas próximas etapas.`);
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
