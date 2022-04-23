$(window).load(function() {

    //all slides
    $('.popupBoxBtn').bind( 'touchstart mousedown', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-popup');
        $(".popup").each(function(){
            $(this).hide();
            if($(this).attr('id') == id) {
                $(this).fadeIn(300);
            }
        });
        $(this).find('p').css({'color':'#fafbfb'});        
    });
    $('.closePopup').bind( 'touchstart mousedown', function() {
        $('.popup').fadeOut(300);
        $('.hiddenLoopBtn').hide();
        setTimeout(function(){
            $('.scrollBox').hide();
            $('.scrollBox1').show();
        },300);

        $('.popupBoxBtn').find('p').css({'color':'#410099'});
         $('.descriptionStudy').find('p').css({'color':'#410099'});

    });

    //im8_s_01
    $('.listLoopBg').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });
    $('.loopBox').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn2').show();
    });

    //im8_s_02
    $('.button').bind( 'touchstart mousedown', function(e) {
        e.preventDefault();
        $('.button').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('data-button');
        $(".showBox").each(function(){
            $(this).hide();
            if($(this).attr('id') == id) {
                $(this).show();
            }
        });
    });

    $('.button1').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });
    $('.button2').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn2').show();
    });
    $('.button3').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn3').show();
    });

    //im8_s_03, 05, 07, 08, 16
    $('.loopViolet').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });

    $('.descriptionStudy').bind( 'touchstart mousedown', function(e) {
        $('.descriptionStudyPopup').fadeIn(300);
        $('.hiddenLoopBtn3, .hiddenLoopBtn4').show();
        $(this).find('p').css({'color':'#fafbfb'});
    });


    $('.scrollBoxAll3Items .scrollBox1 .arrowNext.active').bind( 'touchstart mousedown', function(e) {
                $('.scrollBox').hide();
                $('.scrollBox2').show();
                $('.hiddenLoopBtn').hide();
                $('.hiddenLoopBtn4, .hiddenLoopBtn5').show();
            });
            $('.scrollBoxAll3Items .scrollBox2 .arrowPrev.active').bind( 'touchstart mousedown', function(e) {
                $('.scrollBox').hide();
                $('.scrollBox1').show();
                $('.hiddenLoopBtn').hide();
                $('.hiddenLoopBtn2, .hiddenLoopBtn3').show();
            });
            $('.scrollBoxAll3Items .scrollBox2 .arrowNext.active').bind( 'touchstart mousedown', function(e) {
                $('.scrollBox').hide();
                $('.scrollBox3').show();
                $('.hiddenLoopBtn').hide();
                $('.hiddenLoopBtn6, .hiddenLoopBtn7').show();
            });
            $('.scrollBoxAll3Items .scrollBox3 .arrowPrev.active').bind( 'touchstart mousedown', function(e) {
                $('.scrollBox').hide();
                $('.scrollBox2').show();
                $('.hiddenLoopBtn').hide();
                $('.hiddenLoopBtn4, .hiddenLoopBtn5').show();
            });


    $('.scrollBoxAll3Items .scrollBox1 .arrowNext.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox2').show();
    });
    $('.scrollBoxAll3Items .scrollBox2 .arrowPrev.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox1').show();
    });
    $('.scrollBoxAll3Items .scrollBox2 .arrowNext.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox3').show();
    });
    $('.scrollBoxAll3Items .scrollBox3 .arrowPrev.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox2').show();
    });


    $('.scrollBoxAll2Items .scrollBox1 .arrowNext.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox2').show();
    });
    $('.scrollBoxAll2Items .scrollBox2 .arrowPrev.active').bind( 'touchstart mousedown', function(e) {
        $('.scrollBox').hide();
        $('.scrollBox1').show();
    });


    $('.hiddenLoopBtn3').bind( 'touchstart mousedown', function(e) {
        $('.shortcuts').hide();
        $('.descriptionStudyRef1').fadeIn(300);
    });
    $('.hiddenLoopBtn4').bind( 'touchstart mousedown', function(e) {
        $('.references').hide();
        $('.descriptionStudyShortcuts1').fadeIn(300);
    });

    $('.hiddenLoopBtn5').bind( 'touchstart mousedown', function(e) {
        $('.shortcuts').hide();
        $('.descriptionStudyRef2').fadeIn(300);
    });
    $('.hiddenLoopBtn6').bind( 'touchstart mousedown', function(e) {
        $('.references').hide();
        $('.descriptionStudyShortcuts2').fadeIn(300);
    });

    $('.hiddenLoopBtn7').bind( 'touchstart mousedown', function(e) {
        $('.shortcuts').hide();
        $('.descriptionStudyRef3').fadeIn(300);
    });
    $('.hiddenLoopBtn8').bind( 'touchstart mousedown', function(e) {
        $('.references').hide();
        $('.descriptionStudyShortcuts3').fadeIn(300);
    });

    //im8_s_04
    $('.loopImg1').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });
    $('.loopImg2').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn2').show();
    });
    $('.loopImg3').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn3').show();
    });
    $('.loopImg4').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn4').show();
    });

    //im8_s_05
    $('.loopImg1').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });

    //im8_s_10
    $('.closePopup').bind( 'touchstart mousedown', function() {
        $('.popup').fadeOut(300);
        $('.hiddenLoopBtn').hide();
        setTimeout(function(){ 
            $('.scrollBox').css('top', '0px');
            $('.barLine').css('top', '0px');
        },300);
    });

    // $('#popup4 .clickBarTop').bind( 'touchstart mousedown', function(e) {
    //     $('#popup4 .scrollBox').css('top', '-575px');
    //     $('#popup4 .barLine').css('top', '239px');
    // });
    // $('#popup7 .clickBarTop').bind( 'touchstart mousedown', function(e) {
    //     $('#popup7 .scrollBox').css('top', '-500px');
    //     $('#popup7 .barLine').css('top', '239px');
    // });
    // $('.clickBarBottom').bind( 'touchstart mousedown', function(e) {
    //     $('.scrollBox').css('top', '0px');
    //     $('.barLine').css('top', '0px');
    // });

    $('.loopImg1').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });
    $('.loopImg2').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn2').show();
    });
    $('.loopImg3').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn3').show();
    });
    $('.loopImg4').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn4').show();
    });
    // $('.descriptionStudy').bind( 'touchstart mousedown', function(e) {
    //     $('.hiddenLoopBtn5').show();
    // });

    //im8_s_13
    $('.closePopup').bind( 'touchstart mousedown', function() {
        $('.popup').fadeOut(300);
        $('.hiddenLoopBtn').hide();
        setTimeout(function(){ 
            $('.scrollBox').css('top', '0px');
            $('.barLine').css('top', '0px');
        },300);
    });

    // $('.clickBarTop').bind( 'touchstart mousedown', function(e) {
    //     $('.scrollBox').css('top', '-630px');
    //     $('.barLine').css('top', '140px');
    // });
    // $('.clickBarMiddle').bind( 'touchstart mousedown', function(e) {
    //     $('.scrollBox').css('top', '-1260px');
    //     $('.barLine').css('top', '280px');
    // });
    // $('.clickBarBottom').bind( 'touchstart mousedown', function(e) {
    //     $('.scrollBox').css('top', '0px');
    //     $('.barLine').css('top', '0px');
    // });

    $('.loopImg1').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn1').show();
    });
    $('.loopImg2').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn2').show();
    });
    $('.loopImg3').bind( 'touchstart mousedown', function(e) {
        $('.hiddenLoopBtn3').show();
    });

    //im8_s_15
    $('.flags').bind( 'touchstart mousedown', function(e) {
        e.preventDefault();
        $('.closePopover').show();
        var id = $(this).attr('data-popover');
        $(".boxPopover").each(function(){
            $(this).hide();
            if($(this).attr('id') == id) {
                $(this).fadeIn(300);
            }
        });
    });
    $('.closePopover').bind( 'touchstart mousedown', function() {
        $('.boxPopover').fadeOut(300);
    });








});