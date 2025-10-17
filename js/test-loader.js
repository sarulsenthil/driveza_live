// Simple test to verify data loading
console.log('Test loader script loaded');

// Test the data loader
async function testDataLoader() {
    console.log('Testing data loader...');
    
    try {
        // Test if DriveZAData is available
        if (typeof DriveZAData === 'undefined') {
            console.error('DriveZAData is not defined');
            return;
        }
        
        console.log('DriveZAData is available');
        
        // Test loading data
        const data = await DriveZAData.loadData();
        console.log('Data loaded successfully:', data);
        
        // Test getting cars
        const cars = await DriveZAData.getCars();
        console.log('Cars loaded:', cars);
        
        // Test if carsGrid exists
        const carsGrid = document.getElementById('carsGrid');
        console.log('carsGrid element:', carsGrid);
        
        if (carsGrid && cars && cars.length > 0) {
            console.log('All checks passed, should be able to load cars');
        } else {
            console.log('Some checks failed');
        }
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run test when DOM is loaded
document.addEventListener('DOMContentLoaded', testDataLoader);
