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