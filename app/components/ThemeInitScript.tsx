export default function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var isDark = localStorage.getItem('maths-bg-theme') === 'dark';
              if (isDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              
              // Re-check theme on navigation
              document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'visible') {
                  var isDark = localStorage.getItem('maths-bg-theme') === 'dark';
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              });
            } catch (e) {
              console.error('Error in theme init script:', e);
            }
          })();
        `,
      }}
    />
  )
}
