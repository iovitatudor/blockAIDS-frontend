import React, {FC} from "react";

const FooterContacts: FC = () => {
  return (
    <div className="footer-contacts">
      <a href="mailto:project@blockaids.world" className="email">project@blockaids.world</a>
      <div className="contacts-list">
        <a href="https://telegram.com" className="telegram item" target="_blank" rel="noreferrer">
          <img src="/images/socialMediaIcons/telegram.png" alt=""/>
        </a>
        <a href="https://facebook.com" className="facebook item" target="_blank" rel="noreferrer">
          <img src="/images/socialMediaIcons/faceboook.png" alt=""/>
        </a>
        <a href="https://instagram.com" className="instagram item" target="_blank" rel="noreferrer">
          <img src="/images/socialMediaIcons/instagram.png" alt=""/>
        </a>
        <a href="https://twitter.com" className="twitter item" target="_blank" rel="noreferrer">
          <img src="/images/socialMediaIcons/twitter.png" alt=""/>
        </a>
        <a href="https://discord.com" className="discord item" target="_blank" rel="noreferrer">
          <img src="/images/socialMediaIcons/discord.png" alt=""/>
        </a>
      </div>
    </div>
  );
}

export default FooterContacts;