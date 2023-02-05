import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord,
  faFacebookSquare,
  faGooglePlusSquare,
  faLine,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import metawall from '../assets/MetaWall.png';
import { LoginLayout } from '../Components';
import { useAuth } from '../Context/auth';

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    library.add(faGooglePlusSquare, faLine, faFacebookSquare, faDiscord);
  }, []);
  useEffect(() => {
    const { id } = user || {};
    if (id) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <LoginLayout>
      <section className="flex flex-col items-center">
        <img src={metawall} alt="metawall" className="w-[296px] h-[84px]" />
        <h2 className="text-2xl font-bold mb-9">到元宇宙展開全新社交圈</h2>
        <input
          className="w-full font-mono border-black border-2 py-4 pl-6 m-4"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          className="w-full font-mono border-black border-2 py-4 pl-6 mb-8"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button
          type="button"
          className="w-full bg-blue-900 text-white rounded-md py-4 mb-4"
        >
          登入
        </button>
        <p>
          <a href="/#" className="hover:text-blue-900">
            註冊帳號
          </a>
        </p>
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
            <a href="http://">
              <FontAwesomeIcon
                icon={faLine}
                size="2xl"
                className="text-[#00C300]"
              />
            </a>
          </li>
          <li>
            <a href="http://">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="2xl"
                className="text-[#2AA4F4]"
              />
            </a>
          </li>
          <li>
            <a href="http://">
              <FontAwesomeIcon
                icon={faDiscord}
                size="2xl"
                className="text-[#8C9EFF]"
              />
            </a>
          </li>
        </ul>
      </section>
    </LoginLayout>
  );
}

export default Login;
