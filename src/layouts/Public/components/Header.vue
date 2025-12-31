<template>
    <header>
        <nav class="sentenca_header">
			<div class="row w-100 m-0">
				<div class="col text-center  pt-4">
					<img src="/img/logo3.png" alt="" style="max-width: 340px;">
				</div>
			</div>
        </nav>

		<div class="auth-info sentenca_navbar">
			<ul class="navbar navbar-expand-md navbar-dark ">
				<li @click="showModal('Sobre o Banco de Sentenças',1)" class="nav-item col text-center"><strong><svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg> Sobre o Banco de Sentenças</strong></li>
				<li @click="showModal('Sobre a Justiça Militar',2)" class="nav-item col text-center"><strong><svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z"></path></svg> Sobre a Justiça Militar</strong></li>
			</ul>
		</div>
    </header>

</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            app_name: process.env.VUE_APP_TITLE ?? 'BANCO DE SENTENÇAS DAS JUSTIÇAS MILITARES',
        }
    },
    methods: {
		showModal(texto, rowNumber) {

			let icon,html

			switch (rowNumber) {
				case 1:
					html = '<h3><b>Sobre o Banco de Sentenças</b></h3>'
						+ '	<p>Trata-se de um sistema colaborativo, realizado em conjunto pelos tribunais especializados do segmento "Justiça Militar", e tem como objetivo disponibilizar – em um mesmo local – a consulta às sentenças proferidas por tribunais do  segmento. O acervo é atualizado periodicamente com as sentenças públicas e não sigilosas proferidas pelos juízes da 1ª instância.</p>'
						+ '	<p>Após ter sido lançado em fevereiro de 2025, o Banco de Sentenças das Justiças Militares foi indicado ao Prêmio de Inovação do Poder Judiciário 2025, promovido pelo CNJ, e ao Prêmio Excelência em Inovação na Gestão Pública 2025, promovido pelo CONIP.</p>'
						+ '	<p>As premiações têm por finalidade reconhecer, valorizar e estimular soluções inovadoras e com resultados comprovados para os desafios enfrentados pela Justiça brasileira.</p>'
					break;
				case 2:
					html = '<h3><b>Sobre a Justiça Militar</b></h3>'
						+ '	<p>A Justiça Militar é um ramo especializado do Poder Judiciário, que tem por finalidade a efetiva prestação jurisdicional, protegendo os bens jurídicos tutelados pela lei penal militar, e, no caso da Justiça Militar dos Estados, controlando as ações e atos disciplinares, visando à manutenção da ordem, da disciplina e da hierarquia das instituições militares. Ela se divide em: Justiça Militar da União (JMU) e Justiça Militar Estadual (JME).</p>'
						+ '<hr/>'
						+ '<section>'
						+ '	<h3><b>Justiça Militar da União</b></h3>'
						+ '	<p>A Justiça Militar da União tem competência para julgar os crimes militares previstos em lei, praticados tanto por militares das Forças Armadas (Exército, Marinha e Aeronáutica), quanto por civis. Seu funcionamento está regulamentado pela Lei nº 8.457, de 4 de setembro de 1992.</p>'
						+ '	'
						+ '	<h5><b>• 1ª Instância</b></h5>'
						+ '	<p>O primeiro grau possui 12 Circunscrições Judiciárias Militares que abrangem todos os Estados da Federação e o Distrito Federal, e são compostas por uma ou mais Auditorias Militares. Os julgamentos são realizados, a depender do caso, pelo Conselho Especial de Justiça, pelo Conselho Permanente de Justiça e, monocraticamente, pelo Juiz Federal da Justiça Militar.</p>'
						+ '	<p>Os <b>Conselhos de Justiça</b> são integrados por quatro oficiais e um Juiz Federal da Justiça Militar. O <b>Conselho Permanente de Justiça</b> é responsável por processar e julgar praças, enquanto o <b>Conselho Especial de Justiça</b> tem competência para processar e julgar oficiais, exceto oficiais-generais. Já os civis são processados e julgados de forma monocrática pelo Juiz Federal da Justiça Militar.</p>'
						+ '	'
						+ '	<h4><b>• Superior Tribunal Militar (STM)</b></h4>'
						+ '	<p>O Superior Tribunal Militar (STM), formado por 15 ministros vitalícios, dentre eles, 10 militares (quatro oficiais-generais do Exército, três oficiais-generais da Marinha e três oficiais-generais da Aeronáutica, todos da ativa e do posto mais elevado da carreira) e 5 civis, é competente para receber os recursos remetidos pela primeira instância, além de processar e julgar originariamente os oficiais-generais, quando praticarem crime militar. Os recursos contra as decisões do STM devem ser direcionados ao Supremo Tribunal Federal (STF).</p>'
						+ '</section>'
						+ '<hr/>'
						+ '<section>'
						+ '	<h3><b>Justiça Militar Estadual</b></h3>'
						+ '	<p>A Justiça Militar dos Estados é competente para processar e julgar os militares dos Estados (Polícia Militar e Corpo de Bombeiros Militar), nos crimes militares definidos em lei e as ações judiciais contra atos disciplinares militares, ressalvada a competência do júri quando a vítima for civil. Essa Justiça não julga civis, por expressa vedação constitucional.</p>'
						+ '	<p>Atualmente, a Constituição Federal prevê a possibilidade dos Estados criarem Tribunais de Justiça Militar quando o efetivo de sua Polícia Militar ultrapasse 20.000 integrantes. Contudo, somente três Estados possuem tribunais militares próprios: Minas Gerais, São Paulo e Rio Grande do Sul.</p>'
						+ '	'
						+ '	<h4><b>• 1ª Instância</b></h4>'
						+ '	<p>Em Primeira Instância, compete aos Juízes de Direito do Juízo Militar processar e julgar, singularmente, os crimes militares cometidos contra civis e as ações judiciais contra atos disciplinares militares, cabendo aos Conselhos de Justiça (Especial e Permanente), processar e julgar os demais crimes militares.</p>'
						+ '	'
						+ '	<h4><b>• 2ª Instância</b></h4>'
						+ '	<p>Em Segunda Instância, compete ao Tribunal de Justiça Militar julgar os recursos oriundos da Primeira Instância e, originariamente, os pedidos de habeas corpus e os processos definidos em lei como de sua competência. Os recursos contra as decisões dos Tribunais de Justiça Militar devem ser direcionados ao Superior Tribunal de Justiça (STJ), no caso de recurso especial, ou ao Supremo Tribunal Federal (STF), no caso de recurso extraordinário.</p>'
						+ '</section>'
					break;
			}

			Swal.fire({
				html: html,
  				confirmButtonText: "Fechar",
  				confirmButtonColor: "#003F88",
				width: 800,
				icon: icon
			});
		},
    },
}
</script>

<style lang="scss" scoped>
.navbar {
	margin-bottom: 0px;
}

.collapse.navbar-collapse {
    display: flex;
    justify-content: center;  /* Centraliza os itens no eixo horizontal */
    align-items: center;  /* Centraliza os itens no eixo vertical */
}

.navbar-nav {
    display: flex;
    flex-wrap: nowrap;  /* Impede quebra de linha entre os itens */
    justify-content: center;  /* Garante que os itens fiquem centralizados */
    padding: 0;
    margin: 0;
    list-style-type: none;
}

.nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 10px;
    flex-shrink: 0;  /* Impede que os itens encolham */
}

.nav-item {
    font-size: 0.8rem;
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;  /* Aplica a fonte desejada */
    color: white;  /* Aplica a cor branca ao texto */
    white-space: nowrap;  /* Impede quebra de linha no texto */
}

.w-8 {
    width: 32px;  /* Tamanho do ícone */
}

.h-8 {
    height: 32px;  /* Tamanho do ícone */
}

.hr{
  border-color:#aaa;
  box-sizing:border-box;
  width:100%;
}

@media screen and (min-width: 720px) {
    .navbar-nav {
        flex-direction: row;  /* Organiza os itens em uma linha em telas grandes */
    }
}

strong {
	cursor: pointer;
}
</style>
