function BegerArrangement(groupNum){
	var num = groupNum;
	var lastGroup = groupNum;

	if(groupNum % 2 == 1){
		num ++;
		lastGroup = 0;
	}

	var roundNum = num-1;
	
	var moveStep = num<=4? 1 : (num-4)/2+1;

	var round=1;
	var firstPos=1;
	var lastPos=1;
	var result=new Array();
	for (var i = 0; i <=roundNum; i++) {
		result[i]=new Array();
	}

	while(round <= roundNum){
		lastPos = num+1-lastPos;//swap last position
		
		if(round == 1)
			firstPos = 1;
		else 
			firstPos = (firstPos + moveStep) % (num - 1);

		if(firstPos == 0)
			firstPos = num-1;

		if(firstPos == lastPos)
			firstPos = num+1-lastPos;

		for(var i=1; i<=num/2; i++){
			var pos = [i, num-i+1];
			var player = [0, 0];

			for(var j=0; j<2; j++){
				if(pos[j] == lastPos)
					player[j] = lastGroup;
				else if(pos[j] < firstPos)
					player[j] = num - firstPos + pos[j];
				else player[j] = pos[j] - firstPos + 1;

				result[i-1][(round-1)*2+j]=player[j];
			}
		}
		round++;
	}
	return result;
	

}
// BegerArrangement(4);
var groupNumber=2;
var FieldCount=1; //to keep track of text box added 
// BegerArrangement(groupNumber);
//  
var groupName=new Array();


$(document).ready(function() {  
  
	var MaxInputs       = 20; //maximum input boxes allowed  
	var InputsWrapper   = $("#InputsWrapper"); //Input boxes wrapper ID  
	var AddButton       = $("#AddMoreFileBox"); //Add button ID  
	  
	var x = InputsWrapper.length; //initlal text box count  
	 
	  
	$(AddButton).click(function (e)  //on add input button click  
	{  

	        if(x <= MaxInputs) //max input box allowed  
	        {  
	            FieldCount++; //text box added increment  
	            //add input box  
	            $(InputsWrapper).append('<div ><input type="text" id="field_'+ FieldCount +'" value="队伍 '+ FieldCount +'"/></div>');  
	            x++; //text box increment  
	        }   
	});  
});  

$(document).ready(function(){
  $("h2").click(function(){
    $(".panel").slideToggle("slow");
  });
});

$(document).ready(function(){
	$("#clearall").click(function(){
		$("#InputsWrapper").empty();
		$(".roundblock").remove();
		$("#AddMoreFileBox").removeAttr("disabled");
		// $('#AddMoreFileBox').prop('disabled', false);
		FieldCount=1;
		$("#InputsWrapper").append('<div ><input type="text" id="field_1' +'" value="队伍 1"/></div>');
		$("#InputsWrapper").show();
	});
});


function show(){

	//$('#AddMoreFileBox').addClass('disabled'); // Disables visually
	$('#AddMoreFileBox').prop('disabled', true); // Does nothing
	$('#AddMoreFileBox').attr('disabled', 'disabled'); // Disables visually 
	$("#InputsWrapper").hide();

	for(var i=1;i<=FieldCount;i++){
		var tmp="field_"+i.toString();
		groupName[i]=document.getElementById(tmp.toString()).value;
		groupName[0]=" 轮空";
	}

	var result=BegerArrangement(FieldCount);
	var num=FieldCount;
	var roundNum=num-1;
	//var matchtext="";
	for(var k=0; k<roundNum; k++){

		var div1=document.createElement("div");
		 $(div1).addClass("col-lg-3 col-md-4 col-sm-6 col-xs-12 col-xxs-12 ");

		var div=document.createElement("div");
		$(div).addClass("roundblock text-center");
		div1.appendChild(div);

		var top="round:"+(k+1).toString();
		var para=document.createElement("p");
		var node=document.createTextNode(top);
		para.appendChild(node);
		div.appendChild(para);

		var element=document.getElementById("matchbox");
		element.appendChild(div1);

		//$(div).append('<div><input type="text"  class="avsb" value="'+ FieldCount +'"/></div>');

		for(var i=0; i<num/2; i++){
			var a=result[i][k*2];
			var b=result[i][k*2+1];
			a=groupName[a];
			b=groupName[b];
			var temp= a + " vs " + b;
			if(a==" 轮空"){
				temp=b+a;
			}
			else if(b==" 轮空"){
				temp=a+b;
			}
			
			var para=document.createElement("p");
			var node=document.createTextNode(temp);
			para.appendChild(node);
			//var element=document.getElementById("matchbox");
			div.appendChild(para);

			//matchtext+=temp+"<br /> ";
		}
		//matchtext+="<br /> ";
		$(".roundblock").fadeIn("slow");
		
	}
	//console.log(matchtext);
	//document.getElementById("matchbox").innerHTML=matchtext;
}
$(document).ready(function(){
$("#canvas").mouseover(function(){
	$("#canvas").hide();
	$("#intro").fadeIn("fast");
});
});
window.onload = () => {
	const CANVAS = document.getElementsByTagName("canvas")[0];
	const CTX = CANVAS.getContext("2d");
	const CHARS = [];
	const MAX_CHARS = 200;
	const SEPARATION = 1.5;

	let ww, wh, camera;

	class Vector {
		constructor(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		rotate(dir, ang) {
			const X = this.x;
			const Y = this.y;
			const Z = this.z;

			const SIN = Math.sin(ang);
			const COS = Math.cos(ang);

			if (dir === "x") {
				this.y = Y * COS - Z * SIN;
				this.z = Y * SIN + Z * COS;
			} else if (dir === "y") {
				this.x = X * COS - Z * SIN;
				this.z = X * SIN + Z * COS;
			}
		}

		project() {
			const ZP = this.z + camera.z;
			const DIV = ZP / 600;
			const XP = (this.x + camera.x) / DIV;
			const YP = (this.y + camera.y) / DIV;
			const CENTER = getCenter();
			return [XP + CENTER[0], YP + CENTER[1], ZP];
		}
	}

	class Char {
		constructor(letter, pos) {
			this.letter = letter;
			this.pos = pos;
		}

		rotate(dir, ang) {
			this.pos.rotate(dir, ang);
		}

		render() {
			const PIXEL = this.pos.project();
			const XP = PIXEL[0];
			const YP = PIXEL[1];
			const MAX_SIZE = 50;
			const SIZE = (1 / PIXEL[2] * MAX_SIZE) | 0;
			const BRIGHTNESS = SIZE / MAX_SIZE;
			const COL = `rgba(255, 255, ${100 * BRIGHTNESS | 0 + 150}, ${BRIGHTNESS})`;
			
			CTX.beginPath();
			CTX.fillStyle = COL;
			CTX.font = SIZE + "px monospace";
			CTX.fillText(this.letter, XP, YP);
			CTX.fill();
			CTX.closePath();
		}
	}

	function getCenter() {
		return [ww / 2, wh / 2];
	}

	function signedRandom() {
		return Math.random() - Math.random();
	}

	function render() {
		for (let i = 0; i < CHARS.length; i++) {
			CHARS[i].render();
		}
	}
	
	let time = 0;
	function update() {
		CTX.clearRect(0, 0, ww, wh);
		for (let i = 0; i < CHARS.length; i++) {
			const DX = 0.005 * Math.sin(time * 0.001);
			const DY = 0.005 * Math.cos(time * 0.001);
			CHARS[i].rotate("x", DX);
			CHARS[i].rotate("y", DY);
		}
		++time;
	}

	function loop() {
		window.requestAnimationFrame(loop);
		update();
		render();
	}
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function createChars() {
		const array="从1985年起，世界性比赛多采用“贝格”“编排法。其优点是单数队参加时可避免第二轮的轮空队从第四轮起每场都与前一轮的轮空队比赛的不合理现象。采用“贝格尔”编排法，编排时如果参赛队为双数时，把参赛队数分一半(参赛队为单数时，最后以“0”表示形成双数)，前一半由1号开始，自上而下写在左边；后一半的数自下而上写在右边，然后用横线把相对的号数连接起来。这即是第一轮的比赛。第二轮将第一轮右上角的编号(“0”或最大的一个代号数)移到左角上，三轮又移到右角上，以此类推。即单数轮次时“0”或最大的一个代号在右上角，双数轮次时则在左上角。";
		for (let i=0;i<array.length;i++){
		//for (let i = 0; i < MAX_CHARS; i++) {
			//const CHARACTER = String.fromCharCode((Math.random() * 93 + 34) | 0);
			
			const X = signedRandom() * SEPARATION;
			const Y = signedRandom() * SEPARATION;
			const Z = signedRandom() * SEPARATION;
			const POS = new Vector(X, Y, Z);
			const CHAR = new Char(array[i], POS);
			CHARS.push(CHAR);
		}
	}

	function setDim() {
		ww = window.innerWidth;
		wh = window.innerHeight;
		CANVAS.width = ww;
		CANVAS.height = wh;
	}

	function initCamera() {
		camera = new Vector(0, 0, SEPARATION + 1);
	}

	window.onresize = setDim;

	(() => {
		setDim();
		initCamera();
		createChars();
		loop();
	})();
};