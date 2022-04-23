	const fs = require('fs');
	const path =require('path');
	const {dialog} = require('electron').remote;
	const copydir = require('copy-dir');
	const archiver = require('archiver');

$(function(){

// Add Keymessage

	$(".addKm").on("click",()=>{

		let li = "<li><label><span>Wprowadź nazwę <strong>KM</strong> :</span> <input class='nameKM' type='text'></label></li>"

		$(".active .veeva-pack").append(li);
	});

// Change bookmark

	$(".bookmark h2").on("click",function(){

		$(".bookmark").css({'z-index':'0','opacity':'0.8'}).removeClass("active");
		$(this).parent().css({'z-index':'1','opacity':'1'}).addClass("active");
		
	});

// choose directory for prezentation 

	$('.nameDir').on('click',function(){

		let d = dialog.showOpenDialog({properties: ['openDirectory']});
		$('.active .nameDir').val(d);
	});

// choose template 

	$('.template').on('click',function(){

		let f = dialog.showOpenDialog( {properties: ['openDirectory']} );
		$('.active .template').val(f);
	});

// choose directory for archive 

	$('.packageForZip').on('click',function(){

		let f = dialog.showOpenDialog( {properties: ['openDirectory']} );
		$('.active .packageForZip').val(f);
	})

// Create packages

	// CLM

	createClmPack('.clm .makeDir');

	createZipClm('.clm .makeArchive');

	// VEEVA

	createVeevaPack('.veeva .makeDir');

	createZipVeeva('.veeva .makeArchive');

	// MiTouch

	createMiTouchPack('.mitouch .makeDir');

	createZipMiTouch('.mitouch .makeArchive');

// -----------------------------

})