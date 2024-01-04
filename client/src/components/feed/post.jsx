import React, { useEffect, useState } from 'react';
import "./post.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="cross" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    );
  };
  

const Post = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='post_card'>
            <div className='post_card_top'>
                <div className='post_card_top_left'>
                    <img src={process.env.PUBLIC_URL + "../assets/logo.png"} alt='logo'/>
                    <p>Club name</p>
                </div>
                <div className='post_card_top_right'>
                    <button>
                        Manage subscriptions
                    </button>
                </div>
            </div>
            <div className='post_card_content'>
                <div className='post_card_center_left'>
                    <img src='https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png' alt='poster' />
                </div>
                <div className='post_card_center_right'>
                    <div className='post_text'>
                        <p className='post_title'>Web development Workshop</p>
                        <p className='post_description'>Do you want to be a web developer? Here, you can learn the basic skills 
                            which you need to become one. You will be introduced to HTML, CSS and 
                            JS as well as frontend frameworks like ReactJS and backend environment 
                            like Node.js.
                        </p>
                    </div>
                    <div className='controlButtons'>
                        <div className='enabled_btns'>
                            <button className='enabled'>
                                Register
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"/><path d="M14 3v5h5M18 21v-6M15 18h6"/></svg>
                            </button>
                            <button className='enabled'>
                                Set reminder
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                            </button>
                        </div>
                        <div className='disabled_btns'>
                            <button disabled={true} className='disabled'>
                                05/01/2024
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </button>
                            <button disabled={true} className='disabled'>
                                5PM
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>                        
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;    