/* eslint-disable @next/next/no-img-element */
import React from "react";
import styledComponents from "styled-components";

const Container = styledComponents.div`
    display: flex;
    justify-content: center;
    padding: 2rem
`;

const Image = styledComponents.img`
    margin: 10px;
    width: 34px;
    height: 34px;
`;

function SocialIcons({ social_networks = [] }) {
  social_networks = [
    { name: "Twitter", link: "https://twitter.com/matanga", image_url: "/icons/twitter.png" },
    { name: "Facebook", link: "https://facebook.com/matanga", image_url: "/icons/facebook.png" },
    { name: "Instagram", link: "https://instagram.com/matanga", image_url: "/icons/instagram.png" },
    { name: "Youtube", link: "https://youtube.com/matanga", image_url: "/icons/youtube.png" },
    { name: "Linkedin", link: "https://linkedin.com/matanga", image_url: "/icons/linkedin.png" },
  ];
  return (
    <Container>
      {social_networks.map((s, i) => {
        return (
          <a key={"social_icon_" + i} title={s.name} href={s.link} rel="noreferrer" target="_blank">
            <Image src={s.image_url} alt={"Icone de " + s.name} />
          </a>
        );
      })}
    </Container>
  );
}

export default SocialIcons;
