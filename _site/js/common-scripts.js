/*---LEFT BAR ACCORDION----*/
$(function() {
    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
//        cookie: 'dcjq-accordion-1',
        classExpand: 'dcjq-current-parent'
    });
});

var Script = function () {
    jQuery('#sidebar .sub-menu > a').click(function () {
        var o = ($(this).offset());
        diff = 250 - o.top;
        if(diff>0)
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });



      // sidebar toggle
      $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }
            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    // sidebar 에 따라서 #content 과 #main margin-left 변경
    if (matchMedia("(max-width: 768px)").matches){
      $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
          $('#sidebar').css({ // 사이드바가 없을 때
          });
          $('#sidebar > ul').hide();
          $("#container").addClass("sidebar-closed");
        } else {
          $('#sidebar > ul').show();
          $('#sidebar').css({
          });
          $("#container").removeClass("sidebar-closed");
        }
      });
    } else {
      $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
          $('#sidebar').css({ // 사이드바가 없을 때
              'margin-left': '-210px',
              'transition': '0.5s'
          });
          $('#content').css({
            'margin-left': '10px',
            'width': '69.5%',
            'transition': '0.5s'
          });
          $('#widget').css({
            'width': '29%'
          });
          // $('#markdown').css({
          //     'background': 'blue',
          //     'transition': '0.5s'
          // });
          $('#sidebar > ul').hide();
          $("#container").addClass("sidebar-closed");
        } else {
          $('#sidebar > ul').show();
          $('#sidebar').css({
              'margin-left': '0',
              'transition': '0.5s'
          });
          $('#content').css({
            'margin-left': '220px',
            'width': '59%',
            'transition': '0.5s'
          });
          $('#widget').css({
            'width': '25%'
          });
          // $('#markdown').css({
          //   'background': 'red',
          //   'width': '100%',
          // });
          $("#container").removeClass("sidebar-closed");
        }
      });
    }

}();
