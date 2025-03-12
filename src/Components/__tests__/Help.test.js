import React from "react";
import {render,screen} from "@testing-library/react";
import Help from "../NavComponents/Help/Help"
import "@testing-library/jest-dom";

describe("should", () =>{
    test('component should load', () => {
        render(<Help/>)
      
        //Querying
        const heading = screen.getByRole("heading", { level: 2 });
      
        //whwn multiple same Element is there 
        //const heading = screen.getAllByRole("heading", { level: 2 });
        //expect(heading.length).toBe(2)
          
        
        expect(heading).toBeInTheDocument();
      
        //Assertion
        expect(heading).toBeInTheDocument();
      });
      
      test('component should have button', () => {
          render(<Help/>)
        
         const button= screen.getByRole("button");//=> return react Element which is is end of the day javascript object/react fiberNodes/virtual dom object
          //const button= screen.getByText("submit");
          //Assertion
          expect(button).toBeInTheDocument();
        });
        
})