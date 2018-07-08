$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
  
    questions: {
      q1: 'Which country has won the most FIFA World Cups?',
      q2: 'Which country has won the second most number of World Cups?',
      q3: 'Which two countries have reached the finals the most number of times?',
      q4: 'In what year and what country was the first World Cup held in?',
      q5: "Which player has scored the most number of goals at the FIFA World Cup?",
      q6: 'Who is the only player to have won the World Cup three times?',
      q7: "Which player made the famed 'Hand of God' goal?"
    },
    options: {
      q1: ['Brazil', 'Italy', 'Spain', 'Argentina'],
      q2: ['Argentina', 'Spain', 'Germany', 'Italy'],
      q3: ['Italy & Germany', 'Germany & Brazil', 'Spain & Brazil', 'Brazil & Italy'],
      q4: ['Brazil, 1934', 'Italy, 1930', 'Uruguay, 1930', 'Uruguay, 1928'],
      q5: ['Cristiano Ronaldo','Lionel Messi','Pele','Miroslav Klose'],
      q6: ['Zinedine Zidane','Iker Casillas','Diego Maradona','Pele'],
      q7: ['Pele', 'Diego Maradona', 'Ronaldinho','Miroslav Klose']
    },
    answers: {
      q1: 'Brazil',
      q2: 'Italy',
      q3: 'Germany & Brazil',
      q4: 'Uruguay, 1930',
      q5: 'Miroslav Klose',
      q6: 'Pele',
      q7: 'Diego Maradona'
    },


    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
     
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();

      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
   
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){
  
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
   
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },

    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }

      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }
