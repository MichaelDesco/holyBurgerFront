import Header from "../../layout/header/Header";
import "./about.scss";

const About = () => {
    return (
        <section>
            <Header />
            <div className="container-presentation">
                <div id="presentation">
                    <div className="introduction">
                        <p>Bienvenue sur Holy Burger, la communauté de référence pour tous les passionnés de burgers, qu'ils soient amateurs ou professionnels.</p> 
                        <p>Holy Burger est une communauté en ligne pour les passionnés de burgers, offrant un espace restaurateur pour publier et partager les burgers artisanaux de leurs établissements, et un espace goûteur pour tout les gourmands qui voudront noter et donner leurs avis sur les burgers qu'ils ont eu la chance de déguster.</p>
                        <p>Selon une étude publiée en 2019 par Gira Conseil, le burger est désormais le plat le plus consommé en France, dépassant pour la première fois le célèbre jambon-beurre. En effet, les Français ont consommé plus de 1,46 milliard de burgers en 2018, contre 1,22 milliard de jambon-beurre. Cette tendance de consommation croissante s'explique notamment par l'essor de la restauration rapide et de la street food, qui proposent souvent des burgers de qualité et variés, adaptés aux goûts des consommateurs.</p>
                    </div>
                </div>
            </div>
        </section>
    );   
}

export default About;