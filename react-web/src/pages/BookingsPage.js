import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateBookingForm from '../components/CreateBookingForm'
import BookingsList from '../components/BookingsList'
import Booking from '../components/Booking'

const BookingsPage = ({
    bookings,
    onCreateBooking,
    dateSelected,
    onSelectInspection,
    selectInspValue,
    onDeleteBooking
}) => (
    <div>
        { !!dateSelected &&
          <CreateBookingForm
          onCreate={ onCreateBooking }
          dayTimeSelected={ dateSelected }
          onSelectInspection={ onSelectInspection }
          selectInspValue={ selectInspValue }
          />
        }
    {
        !!bookings ? (
            <Switch>
                <Route path='/bookings/:id' render={
                    ({ match }) => {
                        const id = match.params.id
                        // Pull the specific movie out from the array
                        const booking = bookings.find((booking) => booking._id === id)
                        // Render error message if not movie found
                        if (!booking) {
                            return (
                                <p>Booking with id "{ id }" not found</p>
                            )
                        }

                        // Render the individual movie
                        return (
                            <Booking { ...booking } />
                        )
                    }
                } />
                <Route path='/bookings' render={
                    () => (
                        <BookingsList items={ bookings } onDeleteBooking = { onDeleteBooking }/>
                    )
                  }
                />
            </Switch>
        ) : (
            'Loading bookings…'
        )
    }
    </div>
)

export default BookingsPage
