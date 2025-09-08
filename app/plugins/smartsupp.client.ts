export default defineNuxtPlugin(() => {
  const script = document.createElement('script')
  script.innerHTML = `
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = 'cfa3264c3ac677f2e564aa0dd773f513cb2865d9';
    window.smartsupp||(function(d) {
      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
      c.type='text/javascript';c.charset='utf-8';c.async=true;
      c.src='https://www.smartsuppchat.com/loader.js?';
      s.parentNode.insertBefore(c,s);
    })(document);
  `
  document.head.appendChild(script)
})
