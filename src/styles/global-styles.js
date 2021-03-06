import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
			font-family: Montserrat;
	}

	body {
		margin: 0;
		padding: 0;
		color: #333;
		font-size: 16px;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		overflow-x: hidden;
		max-width: 100%;
		white-space: normal;
	}

	body {
		&::-webkit-scrollbar {
			background-color: transparent;
			width: 0px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: transparent;
		}
	}


	/* Spacing between components */


	.spacing {
		padding-right: 120px;
		padding-left: 120px;
		padding-top: 150px;
		padding-bottom: 150px;
	}

	.spacing .business-item-info {
		padding-top: 160px;
	}

	.spacing .business-item-info h3 {
		font-size: 70px;
		font-weight: 600;
	}

	.spacing .business-item-info p {
		font-size: 22px;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.center {
		text-align: center;
	}



/* Buttons*/
  

	.btn {
		font-size: 14px;
		padding: 10px 30px;
		margin: 5px;
		border-radius: 4px;
		letter-spacing: 1px;
		font-weight: 500;
		color: #fff;
		border: none;
		text-transform: uppercase;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		display: inline-block;
	}

	.btn:focus,
	.btn:active {
		box-shadow: none;
		outline: none;
	}

	.btn-common {
		background-color: #000;
		position: relative;
		z-index: 1;
		box-shadow: 0px 8px 9px 0px rgba(96, 94, 94, 0.17);
		width: 160px;
		height: 50px;
		padding: 14px 15px;
	}

	.btn-common:hover {
		color: #fff;
		transform: translateY(-0.5px);
	}


/* Media Queries */


@media screen and (min-device-width: 1480px) and (max-device-width: 1659px) { 
		.spacing .business-item-info {
			padding-top: 100px;
		}

		.spacing .business-item-info h3 , .section2 h1 , .section3 .business-item-info h3, .section4 .business-item-info h3 {
			font-size: 63px !important;
		}
}


@media screen and (min-device-width: 1380px) and (max-device-width: 1425px) { 
	.spacing .business-item-info {
		padding-top: 60px;
	}
}

@media screen and (min-device-width: 320px) and (max-device-width: 1480px) { 
  
	.spacing .business-item-info {
		padding-top: 50px;
	}

	.spacing .business-item-info p{
		font-size: 18px;
	}

	.spacing .business-item-info h3 , .section2 h1 , .section3 .business-item-info h3, .section4 .business-item-info h3 {
		font-size: 40px !important;
	}

	.cards .card-info , .section2 p , #contactForm input[type=text], #contact form#contactForm input[type=email] , #contactForm textarea{
		font-size: 16px;
	}
}

@media screen and (min-device-width: 800px) and (max-device-width: 1380px) { 
	.spacing {
		padding-left: 60px;
		padding-right: 60px;
	}
	.nav-spacing{
		padding-left: 65px;
		padding-right: 65px;
	}
}

@media screen and (max-device-width: 655px) { 

	.spacing {
		padding-left: 30px;
		padding-right: 30px;
	}
	.nav-spacing{
		padding-left: 40px;
		padding-right: 40px;
	}
}

@media screen and (max-device-width: 400px) { 

	.spacing .business-item-info h3 , .section2 h1 , .section3 .business-item-info h3, .section4 .business-item-info h3 {
		font-size: 37px !important;
	}

	.spacing {
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 30px;
		padding-bottom: 30px;
	}
	.nav-spacing{
		padding-left: 20px;
		padding-right: 20px;
	}

	.cards .card-title{
		font-size: 23px;
	}

	.footer-widget ul li a {
		font-size: 18px;
	}

	.cards .card-item {
		padding: 30px 15px;
	}

	.copyright-text p , .footer-widget ul li {
		font-size: 16px;
	}
}

@media screen and (max-device-width: 425px) { 

	.footer-widget ul li {
		float: none;
		display:table-header-group;
	}

	.footer-social-icon i {
		margin: -2px;
	}

	.row {
		text-align: center;
	}
}

`;