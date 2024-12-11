document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token'); // Supondo que o token é armazenado no localStorage

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'perfil.html'; // Redireciona para a página de login
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('Dados do perfil:', userData);
            // Aqui você pode exibir os dados do usuário na página
            document.getElementById('perfil-nome').textContent = userData.nome;
            document.getElementById('perfil-email').textContent = userData.email;
            document.getElementById('perfil-celular').textContent = userData.celular;
            document.getElementById('perfil-cpf').textContent = userData.cpf;
            // Adicione outros campos conforme necessário
        } else {
            const errorData = await response.json();
            console.error('Erro ao obter dados do perfil:', errorData.message);
            alert('Erro ao carregar os dados do perfil. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
        alert('Erro ao carregar os dados do perfil. Tente novamente mais tarde.');
    }
});