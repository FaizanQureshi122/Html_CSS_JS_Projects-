document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabs = document.querySelectorAll('.tab');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = document.getElementById(link.getAttribute('data-tab'));

            // Remove active class from all tabs and tab links
            tabLinks.forEach(link => link.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to the clicked tab link and the corresponding tab
            link.classList.add('active');
            targetTab.classList.add('active');
        });
    });
});
