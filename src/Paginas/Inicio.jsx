import Container from "react-bootstrap/Container";
import { FaHotel } from "react-icons/fa";

import "./estilos/Inicio.css";
import imgInicio from "../img/wallpaper.png";
import imgCama from "../img/biblia.jpeg"


export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <section>
        <div className="image-container">
          <img className="img" src={imgInicio}></img>
          <div className="listaCompleta text-overlay">
            <h2 className="text-center tituloHotel">
              Cadastro de Versículos Bíblicos
            </h2>
            <p className="paragrafo ">
              <p className="letraInicio">
                {" "}
                Bem-vindo ao nosso espaço de compartilhamento e reflexão bíblica! Aqui,
                você pode cadastrar seus versículos favoritos,
                encontrar inspiração e trocar experiências de fé com outros usuários.
                Nossa missão é conectar pessoas através das sagradas escrituras,
                promovendo uma comunidade de apoio e crescimento espiritual.
              </p>
            </p>
          </div>
        </div>
      </section>
      <section className="camas">
        <div>
          <p>Nossos versículos foram cuidadosamente selecionados para proporcionar uma experiência de reflexão profunda. Cada palavra é uma fusão perfeita de sabedoria e conforto, garantindo que você se entregue a momentos de profunda conexão espiritual. A leitura de qualidade, com mensagens inspiradoras e ensinamentos profundos, complementa o conjunto para criar um santuário de paz interior.</p>
          <p>Além do conforto espiritual, nossos versículos são projetados para envolvê-lo em uma atmosfera de reflexão. Cada passagem bíblica adiciona um toque de iluminação ao seu ambiente de estudo, criando o cenário perfeito para meditar após um dia repleto de atividades.</p>

        </div>
        <aside><img className="imgCama" src={imgCama}></img></aside>
      </section>
    </body>
  );
}
