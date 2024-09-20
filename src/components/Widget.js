const Widget = ({ widget, removeWidget }) => {
    return (
      <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        <h4>{widget.name}</h4>
        <p>{widget.text}</p>
        <button onClick={removeWidget}>Remove</button>
      </div>
    );
  };
  
  export default Widget;
  