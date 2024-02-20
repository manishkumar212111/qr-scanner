import React from  'react';

const Footer = () => {
    return (
        <footer id="footer">
      
          <div class="container-fluid py-4 d-flex justify-content-between">
            <div class="copyright">
              &copy; Copyright 2021 <strong><span>TableFrog</span></strong>
            </div>
            <div class="social-media">
              <ul>
                <li class="mr-3"><a href="https://www.instagram.com/table.frog/" class="instagram"><i class="bx bxl-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/Tablefrog" class="facebook"><i class="bx bxl-facebook"></i></a></li>
              </ul>
            </div>
          </div>
        </footer>
    )
}

export default Footer;