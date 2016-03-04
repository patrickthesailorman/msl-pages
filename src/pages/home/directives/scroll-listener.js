import $ from 'jquery';

/**
 * Scroll listener directive.
 */
export default function scrollListener() {

  'ngInject';

  return {
    restrict: 'A',
    scope: {},
    link,
  };

  function link(scope, element, attrs) {
    $(document).on('scroll', () => {
      let offset = $(window).scrollTop() + $(window).height();
      let height = $(document).height();
      if(offset === height) {
        scope.$parent.$eval(attrs.onBottom);
      }
    });
  }
}
