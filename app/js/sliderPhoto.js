$(function() {
  //scrollpane parts
  var scrollPane = $( ".scroll-pane" ),
    scrollContent = $( ".scroll-content" );

  //build slider
  var scrollbar = $( ".scroll-bar" ).slider({
    slide: function( event, ui ) {
      if ( scrollContent.width() > scrollPane.width() ) {
        scrollContent.css( "margin-left", Math.round(
          ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
        ) + "px" );
        //alert(Math.round(
        //ui.value / 100 * ( scrollPane.width() - scrollContent.width())));
      } else {
        scrollContent.css( "margin-left", 0 );
      }
    }
  });
  //рассчитывается ширина ползунка слдайдера в зависимости от ширины
  //блока с классом scroll-content
  //append icon to handle
  var handleHelper = scrollbar.find( ".ui-slider-handle" )
    .mousedown(function() {
      scrollbar.width( handleHelper.width() );
    })
    .mouseup(function() {
      scrollbar.width( "100%" );
    })
    .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();

  //change overflow to hidden now that slider handles the scrolling
  scrollPane.css( "overflow", "hidden" );

  //size scrollbar and handle proportionally to scroll distance
  function sizeScrollbar() {
    var remainder = scrollContent.width() - scrollPane.width();
    var proportion = remainder / scrollContent.width();
    var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
    scrollbar.find( ".ui-slider-handle" ).css({
      width: handleSize,
      "margin-left": -handleSize / 2
    });
    handleHelper.width( "" ).width( scrollbar.width() - handleSize );
  }


  //init scrollbar size
  setTimeout( sizeScrollbar, 10 );//safari wants a timeout
});