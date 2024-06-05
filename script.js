document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;

            const ticketData = {
                name: name,
                email: email,
                destination: destination,
                date: date
            };

            localStorage.setItem('ticketData', JSON.stringify(ticketData));

            window.location.href = 'ticket.html';
        });
    }

    const ticketDetails = document.getElementById('ticketDetails');
    
    if (ticketDetails) {
        const ticketData = JSON.parse(localStorage.getItem('ticketData'));

        if (ticketData) {
            ticketDetails.innerHTML = `
                <p>Name: ${ticketData.name}</p>
                <p>Email: ${ticketData.email}</p>
                <p>Destination: ${ticketData.destination}</p>
                <p>Date of Journey: ${ticketData.date}</p>
            `;
        }
    }
});
