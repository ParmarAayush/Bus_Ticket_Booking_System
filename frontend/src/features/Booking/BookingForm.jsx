import "./booking.css";
function BookingForm() {
  return (
    <section>
      <div className="searchBus">
        <p className="searchHeading">Find my route</p>
        <form action="" className="searchForm">
          <div className="col">
            <input type="text" className="inputText" name="from" id="from" placeholder="From" />
          </div>
          <div className="col fInput">
            <input type="text" className="inputText" name="to" id="to" placeholder="Destination" />
          </div>
          <div className="col">
            <input type="submit" value="Let's Go" className="btn" />
          </div>
        </form>
      </div>
      {/* <div className="information flex-fill">
        <div className="info"></div>
        <div className="info"></div>
        <div className="info"></div>
      </div> */}
    </section>
  );
}

export default BookingForm;
