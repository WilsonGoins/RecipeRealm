import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import "./BuildYourOwn.css"


const TextboxList = () => {

    const initialIngredientData = Array.from({ length: 20 }, () => ({
        ingredientName: '',
        amount: '',
        unit: '',
        aisle: 'Aisle 1' // Default aisle
    }));

    const initialStepData = Array.from({ length: 15 }, () => '');

    const [ingredientData, setIngredientData] = useState(initialIngredientData);
    const [stepData, setStepData] = useState(initialStepData);

    const handleIngredientChange = (index, field, value) => {
        const newIngredientData = [...ingredientData];
        newIngredientData[index][field] = value;
        setIngredientData(newIngredientData);
    };

    const handleStepChange = (index, value) => {
        const newStepData = [...stepData];
        newStepData[index] = value;
        setStepData(newStepData);
    };

    return (
        <div>
            <h2>Ingredients List</h2>
            {ingredientData.map((item, index) => (
                <div key={index} className="textBoxContainer">
                    <label htmlFor={`ingredientName_${index}`}>Name:</label>
                    <input
                        type="text"
                        id={`ingredientName_${index}`}
                        value={item.ingredientName}
                        onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
                        className="form-control textBox"
                    />

                    <label htmlFor={`amount_${index}`}>Amount:</label>
                    <input
                        type="text"
                        id={`amount_${index}`}
                        value={item.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                        className="form-control textBox"
                    />

                    <label htmlFor={`unit_${index}`}>Unit:</label>
                    <input
                        type="text"
                        id={`unit_${index}`}
                        value={item.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        className="form-control textBox"
                    />

                    <label htmlFor={`aisle_${index}`}>Aisle:</label>
                    <select
                        id={`aisle_${index}`}
                        value={item.aisle}
                        onChange={(e) => handleIngredientChange(index, 'aisle', e.target.value)}
                        className="dropdown"
                    >
                        <option value="Aisle 1">Aisle 1</option>
                        <option value="Aisle 2">Aisle 2</option>
                        <option value="Aisle 3">Aisle 3</option>
                    </select>
                </div>
            ))}

            <div style={{ marginBottom: '100px' }}></div> {/* Add margin bottom for spacing */}

            <h2>Steps</h2>
            {stepData.map((step, index) => (
                <div key={index} className="textBoxContainer">
                    <label htmlFor={`step_${index}`}>Step {index + 1}:</label>
                    <textarea
                        id={`step_${index}`}
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        className="form-control bigTextBox" // Apply a class for bigger textboxes
                    />
                </div>
            ))}
        </div>
    );
}


export default TextboxList;