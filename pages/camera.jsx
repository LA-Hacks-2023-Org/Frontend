import React, { useEffect, useRef, useState } from 'react'
import BackArrow from "../assets/BackArrow"
import IngredientCard from "../components/IngredientCard"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [webcamEnabled, setWebcamEnabled] = useState(false)
  const [showStep1, setShowStep1] = useState(true)
  const [showPicTaken, setShowPicTaken] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [showSingleRecipe, setShowSingleRecipe] = useState(false)
  const [recipeName, setRecipeName] = useState("")


  const [ingredients, setIngredients] = useState([{
    name: "Tomato",
    expiryString: "5 days"
  },
  {
    name: "Potato",
    expiryString: "7 days"
  }])
  const [recipes, setRecipes] = useState([{
    name: "Tomato Soup",
    numberIngredients: 5
  },
  {
    name: "Cheese Cake",
    numberIngredients: 3
  }])


  useEffect(() => {
    if (webcamEnabled) {
      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })

          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        } catch (error) {
          console.error('Error accessing webcam:', error)
          setErrorMsg('Error accessing webcam.')
        }
      }

      getMedia()

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach((track) => {
            track.stop()
          })
        }
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [webcamEnabled])

  const toggleWebcam = () => {
    setWebcamEnabled((prevState) => !prevState)
  }

  const takePicture = () => {
    if (!webcamEnabled) {
      alert('Please turn on the webcam to take a picture.')
      return
    }

    if (videoRef.current && canvasRef.current) {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      const targetWidth = 390;
      const targetHeight = 724;

      // Set the canvas dimensions
      canvasRef.current.width = targetWidth;
      canvasRef.current.height = targetHeight;

      const context = canvasRef.current.getContext('2d');

      // Calculate the scale factor while maintaining the aspect ratio
      const scale = Math.max(targetWidth / videoWidth, targetHeight / videoHeight);

      // Calculate the new width and height based on the scale factor
      const scaledWidth = videoWidth * scale;
      const scaledHeight = videoHeight * scale;

      // Calculate the position to center the image on the canvas
      const posX = (targetWidth - scaledWidth) / 2;
      const posY = (targetHeight - scaledHeight) / 2;

      // Draw the video onto the canvas while scaling and centering the image
      context.drawImage(
        videoRef.current,
        0,
        0,
        videoWidth,
        videoHeight,
        posX,
        posY,
        scaledWidth,
        scaledHeight
      );

      const base64Image = canvasRef.current.toDataURL('image/jpeg');
      console.log(base64Image);
      setShowStep1(false);
      setShowPicTaken(true);
    }
  };

  const retakePicture = () => {
    setShowIngredients(false)
    setShowPicTaken(false);
    setWebcamEnabled(false)
    setShowStep1(true)
    setShowRecipes(false)
    setShowSingleRecipe(false)
    setRecipeName("")

  }

  const continueToIngredients = () => {
    setShowIngredients(true)
    setShowPicTaken(false);
    setWebcamEnabled(false)
    setShowStep1(false)
    setShowRecipes(false)
    setShowSingleRecipe(false)
    setRecipeName("")
    fetchIngredients()
  }


  const continueToRecipes = () => {
    setShowIngredients(false)
    setShowPicTaken(false);
    setWebcamEnabled(false)
    setShowStep1(false)
    setShowRecipes(true)
    setShowSingleRecipe(false)
    setRecipeName("")
    fetchRecipes()
  }

  const continueToSingleRecipe = (recipeName) => {
    setShowIngredients(false)
    setShowPicTaken(false);
    setWebcamEnabled(false)
    setShowStep1(false)
    setShowRecipes(false)
    setShowSingleRecipe(true)
    setRecipeName(recipeName)
  }




  const fetchIngredients = () => {
    const dummyIngredients = [
      {
        id: 1,
        name: "Tomato",
        expiryString: "5 days"
      },
      {
        id: 2,
        name: "Potato",
        expiryString: "7 days"
      }
    ]
    setIngredients(dummyIngredients)
  }

  const fetchRecipes = () => {
    const dummyRecipes = [
      {
        id: 1,
        name: "Tomato Soup",
        numberIngredients: 5
      },
      {
        id: 2,
        name: "Cheese Cake",
        numberIngredients: 3
      }
    ]
    setIngredients(dummyRecipes)
  }


  const deleteIngredient = (id) => {
    const newIngredients = ingredients.filter(ingredient => ingredient.id !== id)
    setIngredients(newIngredients)
  }


  return (
    <div>

      {/* Show single recipe */}
      {
        showSingleRecipe && <div className='w-full h-screen flex flex-col' onClick={continueToRecipes}>
          <div className='relative h-[100px] flex items-center bg-blue-400 text-white w-full'>
            <button className='p-2 hover:bg-white-400 bg-opacity-25'>
              <BackArrow className='ml-6 w-[28px] h-[28px]' />
            </button>
            <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>{recipeName}</h1>
          </div>
          <div className='h-full p-6' >
            COHERE LLM OUTPUT
          </div>
        </div>

      }

      {/* Show Recipes */}
      {
        showRecipes && <div className='w-full h-screen flex flex-col'>
          <div className='relative h-[100px] flex items-center bg-blue-400 text-white w-full'>
            <button className='p-2 hover:bg-white-400 bg-opacity-25' onClick={continueToIngredients} >
              <BackArrow className='ml-6 w-[28px] h-[28px]' />
            </button>
            <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>Your Recipes</h1>
          </div>
          <div className='h-full p-6' >
            <h2 className='text-lg mb-4' >Here's what we found</h2>
            <div className='space-y-4' >
              {
                recipes.map((recipe) => {
                  return <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} numberIngredients={recipe.numberIngredients} onClickFn={() => { continueToSingleRecipe(recipe.name) }} />
                })
              }
            </div>
          </div>
        </div>

      }


      {
        showIngredients &&
        <div className='w-full h-screen flex flex-col'>
          <div className='relative h-[100px] flex items-center bg-blue-400 text-white w-full'>
            <button className='p-2 hover:bg-white-400 bg-opacity-25' onClick={retakePicture}>
              <BackArrow className='ml-6 w-[28px] h-[28px]' />
            </button>
            <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>Your Ingredients</h1>
          </div>
          <div className='h-full p-6' >
            <h2 className='text-lg mb-4' >Here's what we found</h2>
            <div className='space-y-4' >
              {
                ingredients.map((ingredient) => {
                  return <IngredientCard key={ingredient.id} id={ingredient.id} ingredientName={ingredient.name} expiryString={ingredient.expiryString} onClickFn={() => { console.log("Click") }} onDeleteFn={() => {
                    deleteIngredient(ingredient.id)
                  }} />
                })
              }
            </div>
          </div>

          <button onClick={continueToRecipes} className='absolute bottom-2 right-2 transition duration-100 bg-blue-400 p-4 rounded text-white active:bg-blue-500' >Continue</button>

        </div>

      }


      {/* pic taken */}
      <div className={`w-full h-screen flex flex-col ${!showPicTaken ? 'hidden' : 'block'}`}>
        <canvas ref={canvasRef} style={{ width: '390px', height: '724px' }} className={`${!showPicTaken ? 'hidden' : 'block'}`} />
        <div className={` space-x-4 flex h-[120px] bg-gray-600 bg-opacity-20 items-center justify-center ${!showPicTaken ? 'hidden' : 'block'}`}  >
          <button onClick={retakePicture} className='grid place-items-center h-[80px] px-[20px] bg-white rounded-full '>
            Retake
          </button>
          <button className='grid place-items-center h-[80px] px-[20px] bg-white rounded-full ' onClick={continueToIngredients}>
            Select Image
          </button>
        </div>
      </div>



      {/* pic not taken */}
      {
        showStep1 && <>

          <div className='w-full h-screen flex flex-col '>

            <div style={{ width: '390px', height: '724px', backgroundColor: '#eee' }}>
              {!webcamEnabled && (

                <button onClick={toggleWebcam}>{webcamEnabled ? 'Turn off webcam' : 'Turn on webcam'}</button>

              )}

              {
                webcamEnabled && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: '390px',
                      height: '724px',
                      objectFit: 'cover',
                      display: webcamEnabled ? 'block' : 'none',
                    }}
                  />
                )
              }
            </div>
            <div className='h-[120px] bg-gray-600 bg-opacity-20 grid place-items-center' >
              <div className='grid place-items-center h-[80px] w-[80px] bg-white rounded-full'>
                <div className='grid place-items-center h-[72px] w-[72px] bg-black rounded-full'>
                  <button onClick={takePicture} className='rounded-full h-[64px] w-[64px] bg-white'></button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div >
  )
}

export default Home
