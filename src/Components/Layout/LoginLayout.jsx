import React from 'react';
import {
  faDiscord,
  faFacebookSquare,
  faGooglePlusSquare,
  faLine,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImg from '../../assets/loginImg.svg';
import metawall from '../../assets/MetaWall.png';

const API_URL = process.env.REACT_APP_API_URL;

function LoginLayout({ children }) {
  return (
    <main className="linear-gradient min-h-screen flex justify-center items-center">
      <section className="border-2 border-black py-[70px] px-12 shadow-3xl  bg-main">
        <div className="flex justify-between items-center">
          <img
            className="hidden md:block mr-12"
            src={loginImg}
            alt="loginImg"
          />
          <section className="flex flex-col items-center justify-between">
            <img src={metawall} alt="metawall" className="w-[296px] h-[84px]" />
            {children}

            <ul className="flex justify-center space-x-6 mt-3">
              <li>
                <a href={`${API_URL}/users/google`}>
                  <FontAwesomeIcon
                    icon={faGooglePlusSquare}
                    size="2xl"
                    className="text-[#F44F5A]"
                  />
                </a>
              </li>
              <li>
                <a href={`${API_URL}/users/line`}>
                  <FontAwesomeIcon
                    icon={faLine}
                    size="2xl"
                    className="text-[#00C300]"
                  />
                </a>
              </li>
              <li>
                <a href={`${API_URL}/users/facebook`}>
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    size="2xl"
                    className="text-[#2AA4F4]"
                  />
                </a>
              </li>
              <li>
                <a href={`${API_URL}/users/discord`}>
                  <FontAwesomeIcon
                    icon={faDiscord}
                    size="2xl"
                    className="text-[#8C9EFF]"
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

export default LoginLayout;
