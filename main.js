
let modal=document.querySelector(".entry-modal")
let modalCloseBtn=document.querySelector(".close-modal")
let addBtn=document.querySelector(".plus-section")
let saveBtn=document.querySelector(".save-btn")

let openClosePass=document.querySelector(".oc1")
let passCon=document.querySelector(".password-card-box")
let makePass=document.querySelector(".generate-btn")

let dateK=document.querySelector(".date")

let numOfPass= document.querySelector(".mid-item1")

// Password Storage 

let getStorage=()=>JSON.parse(localStorage.getItem("PMG"));

let setStorage=(p)=>localStorage.setItem("PMG",JSON.stringify(p));

if (getStorage()==null){
	console.log("Huyya")
	localStorage.setItem("PMG",'[]')
}

// Date 
let newDate=new Date()
dateK.innerHTML=newDate.getDate()+" - "+(newDate.getMonth()+1)+" - "+newDate.getFullYear()


// Modal 
let formTitle=document.querySelector(".pass-title")
let formPassword=document.querySelector(".main-pass")
let formPix=document.querySelector(".modal-pix")

let stopScroll=document.getElementsByTagName("body")

addBtn.addEventListener("click",()=>{
	modal.classList.remove("no-display")
	window.scrollTo(0,0);
	document.body.classList.add("no-scroll")
})

modalCloseBtn.addEventListener("click",closeModal)

function closeModal(){
	formTitle.value=""
	formPassword.value=""	

	modal.classList.add("no-display")
	document.body.classList.remove("no-scroll")
}

//  Add Password

function addNewPassword(one,two){
	let defaultImg=`padlock${Math.floor(Math.random()*4)}.png`;
	setTimeout(()=>closeModal(),300);

	newStore=getStorage();
	newStore.push([one,two,defaultImg])
	setStorage(newStore);

	reload()

};



// Modal Configure

saveBtn.addEventListener("click",()=>{
	let a=formTitle.value
	let b=formPassword.value	


	if (!a=="" && a.length>=4 && !b=="" && b.length>=7){
		addNewPassword(a,b)
	}

})



//  Toggle the Password Container
openClosePass.addEventListener('click',()=>{
	passCon.classList.toggle("no-display")
})


//  Generate Password 
makePass.addEventListener("click",generatePassword)

function generatePassword(){
	let newPass=[] , mainPass=[]
	let strs=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	let sym=['!', '~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '?', '/', '>', '<', '|']
	let num=['1','2','3','4','5','6','7','8','9','0']
	const span=(e)=> Math.floor(Math.random()*e)
	
	for (i=0;i<7;i++)
		newPass.push(strs[span(strs.length)]);
	for (i=0;i<3;i++)
		newPass.push(sym[span(sym.length)]);
	for (i=0;i<4;i++)
		newPass.push(num[span(num.length)]);

	for (i=1;i<newPass.length;i++)
		mainPass.push(newPass[span(newPass.length)]);

	const finalPassword=mainPass.join("")

	formPassword.value=finalPassword
}


// Get Password Length 

const numPass=()=> numOfPass.innerHTML=getStorage().length;



//  Display Password
function displayPassword(){

	if (getStorage()==null)
		localStorage.setItem("PMG",'[]');

	if (getStorage()){
		passCon.innerHTML=""
		for (i=0;i<getStorage().length;i++){
			let derivedItem=getStorage()[i]
			let one=derivedItem[0],two=derivedItem[1],three=derivedItem[2]
			let rNum=Math.floor(Math.random(1)*4)

			if (!three=="")
				passCon.innerHTML+=`<div class="password-card">
						<img src="pix/${three}"> 
						<div class="password-card-info">
							<p class="bold">${one}</p>
							<p>${two}</p>
						</div>

						<div class="password-card-actions">
							<span onclick="deletePassword(${i})" title="delete">&#9249</span>
							<span onclick="copyPassword(${i})" title="copy">&#128203</span>
						</div>
					</div>
				`;
			else 
				passCon.innerHTML+=`<div class="password-card">
					<img src="pix/padlock${rNum}.png"> 
					<div class="password-card-info">
						<p class="bold">${one}</p>
						<p>${two}</p>
					</div>

					<div class="password-card-actions">
						<span >&#9249</span>
						<span>&#128203</span>
					</div>
				</div>
			`;

		}
	}

}

const reload=()=>{ displayPassword(); numPass(); }

reload()



function deletePassword(id){
	let iTD=getStorage();
	iTD.splice(id,1);
	setStorage(iTD);
	reload();
};

function copyPassword(id){
	let  iTC=getStorage()[id][1]
	console.log(iTC)
	navigator.clipboard.writeText(iTC)

}






