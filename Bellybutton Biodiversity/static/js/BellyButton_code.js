// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleOBJ => sampleOBJ.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var frequency = parseFloat(metadata.wfreq);

    // Create the yticks for the bar chart.
    var barData = [
      {
        y: otu_ids.slice(0,10).reverse().map(x=>`ID ${x}`), 
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Picnic"
        }
      }
    ]

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData); 
    
    // Use Plotly to plot the bubble data and layout.
    // Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: {x: [0, 1], y: [0, 1] },
        value: frequency,
        title: { text: "<b>Belly Button Washing Frequency</b><br> Scrubs per Week"},
        type: "indicator",
        mode: "guage+number",
        guage: {
          axis: {range: [null, 10]},
          bar: {color:"rgba(0,0,0,0.75)"},
          steps: [
            {range: [0,2], color: "#64113F"},
            {range: [2,4], color: "#DE4D86"},
            {range: [4,6], color: "F29CA3"},
            {range: [6,8], color: "F7CACD"},
            {range: [8,10], color: "#84E6F8"}
          ],
        }
      }    
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 500, 
     height: 425,
     margin: {t:0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("guage", gaugeData, gaugeLayout);
  });
}
console.log("toronto maple leafs")
buildCharts("940")