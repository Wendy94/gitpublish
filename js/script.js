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

// for(var k=0; k<roundNum; k++){
// 		console.log("round:"+(k+1).toString());
// 			for(var i=0; i<num/2; i++){
// 				var a=result[i][k*2];
// 				var b=result[i][k*2+1];
// 				var temp= a + " vs " + b;
// 				console.log(temp);
// 		}
		
// 		console.log("\n");
// 	}

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
	            $(InputsWrapper).append('<div><input type="text" name="mytext[]" id="field_'+ FieldCount +'" value="队伍 '+ FieldCount +'"/></div>');  
	            x++; //text box increment  
	        }  
	return false;  
	});  
});  

function show(){

	 $('a').addClass('disabled'); // Disables visually
	$('a').prop('disabled', true); // Does nothing
	$('a').attr('disabled', 'disabled'); // Disables visually 


	for(var i=1;i<=FieldCount;i++){
		var tmp="field_"+i.toString();
		groupName[i]=document.getElementById(tmp.toString()).value;
		groupName[0]="轮空";
	}

	var result=BegerArrangement(FieldCount);
	var num=FieldCount;
	var roundNum=num-1;
	var matchtext="";
	for(var k=0; k<roundNum; k++){
		matchtext+="round:"+(k+1).toString()+"<br /> ";
			for(var i=0; i<num/2; i++){
				var a=result[i][k*2];
				var b=result[i][k*2+1];
				a=groupName[a];
				b=groupName[b];
				var temp= a + " vs " + b;
				if(a=="轮空"){
					temp=b+a;
				}
				else if(b=="轮空"){
					temp=a+b;
				}
				
				matchtext+=temp+"<br /> ";
		}
		matchtext+="<br /> ";
		
	}
	console.log(matchtext);
	document.getElementById("matchbox").innerHTML=matchtext;

}