export default function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Constants
              var THEME_STORAGE_KEY = 'maths-bg-theme';
              var THEME_COOKIE_NAME = 'maths-bg-theme';
              
              // Get theme from all available sources
              function getThemePreference() {
                // Check localStorage first
                var localTheme = localStorage.getItem(THEME_STORAGE_KEY);
                if (localTheme === 'dark' || localTheme === 'light') {
                  return localTheme;
                }
                
                // Check cookies next
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                  var cookie = cookies[i].trim();
                  var parts = cookie.split('=');
                  if (parts[0] === THEME_COOKIE_NAME) {
                    if (parts[1] === 'dark' || parts[1] === 'light') {
                      return parts[1];
                    }
                  }
                }
                
                // Check if dark mode is already applied to HTML
                if (document.documentElement.classList.contains('dark')) {
                  return 'dark';
                }
                
                // Default to light
                return 'light';
              }
              
              // Apply theme to document
              function applyTheme(theme) {
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  // Set explicit background colors to prevent flash
                  document.documentElement.style.backgroundColor = '#171717';
                  document.body.style.backgroundColor = '#171717';
                } else {
                  document.documentElement.classList.remove('dark');
                  // Reset background colors for light mode
                  document.documentElement.style.backgroundColor = '';
                  document.body.style.backgroundColor = '';
                }
                
                // Also set data attribute for CSS targeting
                document.documentElement.setAttribute('data-theme', theme);
              }
              
              // Initialize theme
              var theme = getThemePreference();
              applyTheme(theme);
              
              // Set up navigation observer to reapply theme
              document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'visible') {
                  applyTheme(getThemePreference());
                }
              });
              
              // Reapply on focus
              window.addEventListener('focus', function() {
                applyTheme(getThemePreference());
              });
              
              // Create a MutationObserver to watch for navigation
              var observer = new MutationObserver(function(mutations) {
                applyTheme(getThemePreference());
              });
              
              // Start observing once DOM is loaded
              document.addEventListener('DOMContentLoaded', function() {
                observer.observe(document.body, { 
                  childList: true,
                  subtree: true
                });
              });

              // Add transition blocker style
              var style = document.createElement('style');
              style.textContent = '.prevent-transition { transition: none !important; }';
              document.head.appendChild(style);

              // Add event listener for page transitions
              window.addEventListener('beforeunload', function() {
                // If in dark mode, ensure background stays dark during transition
                if (getThemePreference() === 'dark') {
                  document.documentElement.style.backgroundColor = '#171717';
                  document.body.style.backgroundColor = '#171717';
                }
              });
            } catch (e) {
              console.error('Error in theme initializer:', e);
            }
          })();
        `,
      }}
    />
  )
}
