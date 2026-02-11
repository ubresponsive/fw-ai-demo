 jQuery(function($) {  
        $('button.project-search-cross').click(function(){
          $("#autosearch").val('');
          $(".blog-listing-wrapper").load(" .blog-listing-wrapper");
          $('button.project-search-cross').hide();        
        });

        $('.search-autocomplete').keypress(function(event) {
            if (event.keyCode == 13) {
              event.preventDefault();
            }
        });

        var Ajax_Url = $("#admin_url").val();
        $(".search-autocomplete").keyup(function() {
          var searchlength = $("#autosearch").val().length;
          if(searchlength > 0) {
            $('button.project-search-cross').show();
          }
          var inputVal = $("#autosearch").val();
          if(inputVal == ""){
            $(".project-listing").load(" .project-listing");
          }
          var formdata = new FormData(document.getElementById('customSearchForm'));
          formdata.append('action', 'search_site');
          $.ajax({
          type: "POST",
          url: Ajax_Url,
          data: formdata,
            processData: false,
            contentType: false,
          success: function(data){
            $("#suggesstion-box").show();
            $("#suggesstion-box").html(data);
            $(".search-autocomplete").css("background","#FFF");
          }
          });

        });
        $("body").click(function(){
          $("#suggesstion-box").hide();
        });
      });

      function selectProject(val) {
      var winWidth = $(window).width();
      if(winWidth < 768) {
        $([document.documentElement, document.body]).animate({
          scrollTop: $('.project-listing').offset().top - 100
        }, 2000);
      }
      $(".search-autocomplete").val(val);
      $("#suggesstion-box").hide();
      var Ajax_Url = $("#admin_url").val();
      var sVal = $('.search-autocomplete').val();
      var formdata = new FormData(document.getElementById('customSearchForm'));
      formdata.append('action', 'search_project');
      if(sVal !=""){
        $.ajax({
          type: "post",
          url: Ajax_Url,
          data: formdata,
          processData: false,
          contentType: false,       
          beforeSend: function () {
                $('.loader').removeClass('hide');
              },
          success: function (data) {
            $('.loader').addClass('hide');
            if(data != '') {
              $('.project-append').hide();
              $('.searchResult').html("");
              $('.searchResult').append(data);
              //$('.load-more-section').hide();
            } else{
              window.location = window.location.hostname+'/not-found';
            }              
          },
          error: function(xhr, status, error) {
            console.log(error);
            var err = eval(xhr.responseText);
            alert(err);
          }
        });
      }

    }



     jQuery(function($) {  
      $('button.project-search-cross1').click(function(){
          $("#autosearch-detail").val('');
          $(".project-append").load(" .project-append");
          $(".project-append").show();
          $('.searchResult1').hide();
          $('button.project-search-cross1').hide();        
        });
        $('.search-autocomplete-detail').keypress(function(event) {
          if (event.keyCode == 13) {
            event.preventDefault();
          }
        });

        var Ajax_Url = $("#admin_url").val();
        $(".search-autocomplete-detail").keyup(function() {
          var searchlength = $("#autosearch-detail").val().length;
          if(searchlength > 0) {
            $('button.project-search-cross1').show();
          }
          var inputVal = $("#autosearch-detail").val();
          if(inputVal == ""){
            $(".project-listing").load(" .project-listing");
          }
          var formdata = new FormData(document.getElementById('customSearchForm-detailpage'));
          formdata.append('action', 'search_site_detailpage');
          $.ajax({
          type: "POST",
          url: Ajax_Url,
          data: formdata,
            processData: false,
            contentType: false,
          success: function(data){
            $("#suggesstion-box1").show();
            $("#suggesstion-box1").html(data);
            $(".search-autocomplete-detail").css("background","#FFF");
          }
          });

        });
        $("body").click(function(){
          $("#suggesstion-box1").hide();
        });
      });

      function selectProject_detailpage(val) {
      var winWidth = $(window).width();
      if(winWidth < 768) {
        $([document.documentElement, document.body]).animate({
          scrollTop: $('.project-listing').offset().top - 100
        }, 2000);
      }
      $(".search-autocomplete-detail").val(val);
      $("#suggesstion-box1").hide();
      var Ajax_Url = $("#admin_url").val();
      var sVal = $('.search-autocomplete-detail').val();
      var formdata = new FormData(document.getElementById('customSearchForm-detailpage'));
      formdata.append('action', 'search_project_detailpage');
      if(sVal !=""){
        $.ajax({
          type: "post",
          url: Ajax_Url,
          data: formdata,
          processData: false,
          contentType: false,       
          beforeSend: function () {
                $('.loader').removeClass('hide');
              },
          success: function (data) {
            $('.loader').addClass('hide');
            if(data != '') {
              $('.project-append').hide();
              $('.searchResult1').html("");
              $('.searchResult1').append(data);
            } else{
              window.location = window.location.hostname+'/not-found';
            }              
          },
          error: function(xhr, status, error) {
            console.log(error);
            var err = eval(xhr.responseText);
            alert(err);
          }
        });
      }

    }