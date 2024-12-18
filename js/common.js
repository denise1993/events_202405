
//被回上一頁時 強制重新執行該網頁 ios+pc+安卓
// window.onpageshow = function(event) {
// 	if (event.persisted || performance.getEntriesByType("navigation")[0].type === 'back_forward') {
// 		window.location.href = "https://events.ettoday.net/dbs2024/index.htm";
// 	}
// };

$(function(){

  // 計分
  const arr = $('.questions_box .question');
  let totalStep = arr.length;
  let step = 0;
  let score = 0;
  const ScoringRules = {
    "q1": { //0:錯誤 1:正確
      a: 0,
      b: 1
    },
    "q2": {
      a: 0,
      b: 1
    },
    "q3": {
      a: 0,
      b: 1
    },
    "q4": {
      a: 0,
      b: 1
    },
    "q5": {
      a: 0,
      b: 1
    },
    "q6": {
      a: 0,
      b: 1
    },
    "q7": {
      a: 0,
      b: 1
    }
  }

  //陣列亂數
  function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //打字效果
	function aniTyped(){
		let $Qa = $(".question.current .question__txt");
		let $QaList = $(".question.current .question__list li");
		let $QaStrings = $Qa.text();
		$Qa.find('em').typed({
			strings: [$QaStrings],
			typeSpeed: 0,
			cursorChar: "",
			contentType: 'html',
			// backSpeed: 500,
			callback: function() {
        $(".question.current .question__img").addClass('ani');
				const myTL1 = new TimelineMax();
				myTL1.to($QaList, {
          opacity: 1,
          y: 0 ,
          delay: .8,
          stagger: 0.5
        });
			}
		});
	}

  function getType(){
    let myType = '';
    switch (true) {
      case score === totalStep: //全答對
        myType = 'result1';
        break;
      case score >= 4 && score <= 6: //4~6
        myType = 'result2';
        break;
      case score >= 0 && score <= 3: //1~3
        myType = 'result3';            
        break;
    }
    return myType;
  }

  //下一題
  function nextStep(){
    
    const answer = $(this).data('answer');
    const id = $(this).parents('.question').attr('id');
    score = score + ScoringRules[id][answer];
    $(`#${id}`).find('.question__content').hide();  
    step++;
    if(step >= totalStep){ //全部做完
      let myType = getType();
      $(`#${id}`).find('.answer__btn').text('測驗結果').attr('href',`result.htm?type=${myType}`);
		
			gtag('event', `結果頁-${myType}`, {
			  'event_category': "結果頁",
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用	
			});  
		
		
    }    
    
    if(ScoringRules[id][answer] === 1){ //正確
      $(`#${id}`).find('.answer_box .answer__yes').css('display', 'flex');
    }else{
      $(`#${id}`).find('.answer_box .answer__no').css('display', 'flex');
    }

    const myTL2 = new TimelineMax();
    myTL2.to($('.question.current .answer > *'), {
      opacity: 1,
      y: 0,
      stagger: 0.1
    });

    $(`#${id}`).find('.answer_box .answer__btn').one('click',()=>{
      $(`#${id}`).removeClass("current").next().addClass("current");
      aniTyped();
    });

  }

  // ***************** questions.htm *****************
  if($('.questions').length > 0){
    //初始
    shuffleArray(arr);
    $('.questions_box').empty().append(arr);
    $('.questions_box .question').eq(0).addClass('current');
    aniTyped();
    $('.questions_box .question .question__list > li').one('click', nextStep);
  }  

  // ***************** result.htm *****************
  if($('.result').length > 0){
    $(".result .loading > p").typed({
      strings: ["您的測驗結果是..."],
      typeSpeed: 200,
      loop: true,
      cursorChar: "",
      contentType: 'html',
      callback: function() {
        setTimeout(()=>{
          $(".result .loading").fadeOut();
        }, 800);
      }
    });

    let params = new URL(document.location).searchParams;
    let myType = params.get("type");
    $('.result_box > img').attr('src', `./images/${myType}.jpg`);
  }


});


//------------------- GA trackevent -------------------
$(function () {
	
		//index首頁-開始按鈕
	    $(".index .cover__btn-start").click(function () {
			gtag('event', "開始按鈕", {
			  'event_category': "開始按鈕",
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用	
			});      
		}); 
	
	
		//questions頁-題目+選項
	    $(".questions_box .question ul li").click(function () {
			//var iNo = $(this).parents(".question").index()+1;
			var sQuestion = $(this).parents(".question__content").find(".question__txt").find("em").text();
			gtag('event', $(this).text(), {
			  'event_category': `${sQuestion}`,
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用	
			});
    	});  
	
		//questions頁-LOGO
	    $(".logo_DBS a").click(function () {
			gtag('event', "點LOGO", {
			  'event_category': "點LOGO",
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用		
			});
    	});  	
	
		//結果頁-點此進修
	    $(".result a.btn_go").click(function () {
			gtag('event', "點此進修", {
			  'event_category': "結果頁",
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用	
			});   
    	});  	
	
		//結果頁-連FB活動頁
	    $(".info a").click(function () {
			gtag('event', "連FB活動頁", {
			  'event_category': "結果頁",
			  'send_to': ['G-WPZM3X3PZH'] //業務活動專用	
			});   
    	});  	
 	
		
});