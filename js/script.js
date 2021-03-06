var filename="";
var myScroll;
var myScroll1;

function loaded () {
	myScroll = new IScroll('#chooseType', {
		eventPassthrough: true, 
		scrollX: true,
		scrollY: false,
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		click:true,
		preventDefault: false
	 });
	myScroll1 = new IScroll('#chooseImg', {
		eventPassthrough: true, 
		scrollX: true,
		scrollY: false,
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		click:true,
		preventDefault: false
	});
}
document.body.ondragstart=function(){return false;};
$(function(){
	if(head.mobile) $('#title').html('文字壁纸');
	document.getElementById("upfilet1").addEventListener("change", function() {
		$('#fileinput-button-t1').attr('disabled','disabled');
		$('#fileinput-button-t1 span').html('上传中...');
    	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = this.files[0],
        chunkSize = 2097152,                               // read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        frOnload = function(e) {
            spark.append(e.target.result);                 // append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            }
            else {
				document.forms['form1'].submit();//上传图片。
            }
        },
        frOnerror = function () {
            alert("图片上传出错，请点击右上角“问题反馈”提交您的问题以及选择的样式。");
        };

		function loadNext() {
			var fileReader = new FileReader();
			fileReader.onload = frOnload;
			fileReader.onerror = frOnerror;
	
			var start = currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
	
			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		};
	
		loadNext();
	});
	
	document.getElementById("upfilet3").addEventListener("change", function() {
		$('#fileinput-button-t3').attr('disabled','disabled');
		$('#fileinput-button-t3 span').html('上传中...');
    	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = this.files[0],
        chunkSize = 2097152,                               // read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        frOnload = function(e) {
            spark.append(e.target.result);                 // append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            }
            else {
				document.forms['form1'].submit();//上传图片。
            }
        },
        frOnerror = function () {
            alert("图片上传出错，请点击右上角“问题反馈”提交您的问题以及选择的样式。");
        };

		function loadNext() {
			var fileReader = new FileReader();
			fileReader.onload = frOnload;
			fileReader.onerror = frOnerror;
	
			var start = currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
	
			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		};
	
		loadNext();
	});
	loaded();
	
	$('#t3Names input').poshytip({
		className: 'tip-twitter',
		showOn: 'focus',
		showTimeout: 1,
		alignTo: 'target',
		alignX: 'center',
		offsetY: 5,
		allowTipHover: false,
		fade: false,
		slide: false
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		//e.target // activated tab
		// e.relatedTarget // previous tab
		if(e.target.href.indexOf("t3") < 0 ) {
			document.getElementById('bgImgt1').value = "";
			document.getElementById('bgImgt3').value = "";
			if(e.target.href.indexOf("color") >= 0 ) {
				ChangeType(10);
			}
			else{
				ChangeType(11);
			}
		}else{
			$('#t3').css('background','#'+$("#colorPickerT3").val());
			document.getElementById('bgImgt1').value = "";
			document.getElementById('bgImgt3').value = "";
		}
	});

	var loading = $('#loadingImg');
	var result = $('#resultImg');;
	$('#myModal').on('show.bs.modal', function (e) {
		$('#loadInfo').html("文字壁纸生成中···");
		$.ajax({
			url:'./iPhone5sBG.php',
			type:'POST',
			data:$('input').serialize(), //序列化表单的值
			success: function(src){
				$('#loadInfo').slideUp('fast').html("文字壁纸生成成功，加载中···<br />(背景复杂的文字壁纸加载较慢，请耐心等待)").slideDown('fast');
				var img = new Image();
				img.src = src;
				$(img).load(function(){
					result=$("<a href=\""+src+"\" target=\"_blank\"><img id=\"resultImg\" src=\""+src+"\" width=\"100%\" \/><\/a>");
					$('#loadInfo').slideUp('fast').html("手机浏览器长按或点击图片保存 <br /> 若无法保存，请使用自带safari浏览器").slideDown('fast');
					loading.hide();
        			loading.after(result);
				});
			},
		});
	})
	$('#myModal').on('hidden.bs.modal', function (e) {
		result.remove();
		loading.show();
		$('#loadInfo').html("");
		$.ajax({
			url:'./iPhone5sBG.php?type=0&filename='+filename,
			type:'GET'
		});
	});
});
function GetRandomNum(Min,Max)
{
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}
/**
* 当前日期加时间(如:2014-02-18 23:23)
*
*/
function CurentTime()
{
	var now = new Date();
	var year = now.getFullYear();       //年
	var month = now.getMonth() + 1;     //月
	var day = now.getDate();            //日
	var hh = now.getHours();            //时
	var mm = now.getMinutes();          //分
	var ss = now.getSeconds();     //获取当前秒数(0-59)
	var clock = year;
	if(month < 10)
		clock += "0";
	clock += month;
	if(day < 10)
		clock += "0";
	clock += day;
	if(hh < 10)
		clock += "0";
	clock += hh;
	if (mm < 10)
		clock += '0';
	clock += mm;
	if (ss < 10)
		clock += '0';
	clock += ss;
	return(clock);
}


function ChangeType(type){
	if($('#type').val()==type)return;
	$('#font').val(0);
	$('#type').val(type);
	document.getElementById('t1').style.display='none';
	document.getElementById('t3').style.display='none';
	document.getElementById('t4').style.display='none';
	document.getElementById('t5').style.display='none';
	document.getElementById('t6').style.display='none';
	document.getElementById('t7').style.display='none';
	document.getElementById('t8').style.display='none';
	document.getElementById('t9').style.display='none';
	document.getElementById('t100').style.display='none';
    document.getElementById('t101').style.display='none';
	$('.type').css("border","1px solid #DDDDDD");
	$('.type').css("backgroundColor","white");
	$('#type'+type).css("borderColor","red");
	$('#type'+type).css("backgroundColor","red");
	switch(type){
		case 1:
			$('#type11').css("borderColor","red");
			$('#type11').css("backgroundColor","red");
			document.getElementById('t1').style.display='block';
			$('#t1').css('background','url(../img/11bg.jpg) center no-repeat');
			document.getElementById('bgImgt1').value = "img/11.jpg";
			break;
		case 3:
			$('#font').val(1);
			document.getElementById('t'+type).style.display='block';
			document.getElementById('bgImgt1').value = "";
			document.getElementById('bgImgt3').value = "";
			break;
        case 101:
            $('#font').val(1);
            document.getElementById('t'+type).style.display='block';
            document.getElementById('bgImgt1').value = "";
            document.getElementById('bgImgt3').value = "";
            break;
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 100:
			document.getElementById('t'+type).style.display='block';
			document.getElementById('bgImgt1').value = "";
			document.getElementById('bgImgt3').value = "";
			break;
		case 10:
			$('#type1').css("borderColor","red");
			$('#type1').css("backgroundColor","red");
			document.getElementById('t1').style.display='block';
			$('#t1').css("background",'none #'+$('#colorPickerT1').val());
			document.getElementById('bgImgt1').value = "";
			break;
		default:
			$('#type1').css("borderColor","red");
			$('#type1').css("backgroundColor","red");
			document.getElementById('t1').style.display='block';
			$('#t1').css('background','url(../img/'+type+'bg.jpg) center no-repeat');
			document.getElementById('bgImgt1').value = "img/"+type+".jpg";
			break;
	}
}
function getCounter(){
	$.get("Counter.php", function(result){
		$("#counter").html("今日已为"+result+"次 :-)");
	});
	setTimeout("getCounter()", 60000);
}
getCounter();
var typeOld = parseInt($('#type').val());
$('#type').val(11);
ChangeType(typeOld);