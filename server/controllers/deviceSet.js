import DeviceSetModel from '../models/deviceSet.js';
import DeviceModel from '../models/device.js';
import UserModel from "../models/user.js";


export const getDeviceSet = async (req, res) => { 
    try {
        const deviceSetMessage = await DeviceSetModel.find();

        res.status(200).json(deviceSetMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateDeviceSet = async (req, res) => {
    //body: {id: '', setName: '', username: '', trafficLightName: '', DHT11Name: '', lightName: ''}
    
    let { id, setName, username, trafficLightName, DHT11Name, lightName} = req.body;

    let { userID, trafficLightId, DHT11Id, lightId } = '';

    const oldSet = await DeviceSetModel.findById(id);
    if (!oldSet) {
        return res.status(404).json({ message: "DeviceSet doesn't exist."});
    }

    // if (( setName=='' && username=='' && trafficLightName == '' &&  DHT11Name == '' && lightName == '' ) || 
    //     (trafficlight==oldDevice.trafficLightId && DHT11==oldDevice.DHT11Id && Light==oldDevice.lightId && setName==oldDevice.setName)) {
    //     return res.status(200).json({ message: "Nothing was changed."});
    // }

    if (setName != oldSet.setName) {
        if (setName == '') {
            setName = oldSet.setName;
        }
        else {
            const oldSetName = await DeviceSetModel.findOne({ setName: setName });
            if (oldSetName) return res.status(400).json({ message: "Set Name already exists" });
        }
    }

    if (username == '') {
        userID = oldSet.userID;
    } else if (username == 'None') {
        await UserModel.findByIdAndUpdate(oldSet.userID, {deviceSetName: ''})
        userID = '';
    }
    else {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist."}); 
        }
        if (user.role == 'Admin') {
            return res.status(400).json({ message: "User cannot be admin." });
        }
        userID = user.id;
        //kiểm tra diviceSetName trong UserModel
        if (user.deviceSetName != setName) {
            await UserModel.findByIdAndUpdate(userID, {deviceSetName: setName}, {new: true} );
        }
    }

    if (trafficLightName == '') {
        trafficLightId = oldSet.trafficLightId;
    }
    else {
        const tf = await DeviceModel.findOne({ name: trafficLightName, type: 'Traffic Light' })
        if (!tf) {
            return res.status(400).json({ message: "Traffic Light doesn't exist."}); 
        }
        trafficLightId = tf.id;
    }

    if (DHT11Name == '') {
        DHT11Id = oldSet.DHT11Id;
    }
    else {
        const dId = await DeviceModel.findOne({ name: DHT11Name, type: 'DHT11' })
        if (!dId) {
            return res.status(400).json({ message: "DHT11 doesn't exist."}); 
        }
        DHT11Id = dId.id;
    }

    if (lightName == '') {
        lightId = oldSet.lightId;
    }
    else {
        const lId = await DeviceModel.findOne({ name: lightName, type: 'Light' })
        if (!lId) {
            return res.status(400).json({ message: "Light doesn't exist."}); 
        }
        lightId = lId.id;
    }
    
    let updateDeviceSet = { setName, userID, trafficLightId, DHT11Id, lightId };

    try {
        let updatedDeviceSet = await DeviceSetModel.findByIdAndUpdate(id, updateDeviceSet, { new: true });
        const keys = ['DHT11Id', 'lightId', 'trafficLightId']
        for (let i = 0; i < keys.length; i++) {
            const device = await DeviceModel.findOne({
                _id: updatedDeviceSet[keys[i]] 
            })
            updatedDeviceSet[keys[i]] = device.name
        } 

        if (userID) { 
            const user = await UserModel.findById(userID);
            updatedDeviceSet.userID = user.username
        }
        res.status(200).json(updatedDeviceSet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addDeviceSet = async (req, res) => {

    //body: {id: '', setName: '', username: '', trafficLightName: '', DHT11Name: '', lightName: ''}

    const { username, trafficLightName, DHT11Name, lightName } = req.body;

    const index = await DeviceSetModel.estimatedDocumentCount()

    let setName

    if (index < 10) {
        setName = 'SET00' + index
    } else if (index > 10 && index <100) {
        setName = 'SET0' + index
    } else {
        setName = 'SET' + index
    }

    const oldTL = await DeviceModel.findOne({name : trafficLightName});
    if (oldTL == null) return res.status(404).json({ message: "Traffic Light doesn't exist" });
    const oldDHT = await DeviceModel.findOne({name : DHT11Name});
    if (oldDHT == null) return res.status(404).json({ message: "DHT11 doesn't exist" });
    const oldL = await DeviceModel.findOne({name : lightName});
    if (oldL == null) return res.status(404).json({ message: "Light doesn't exist" });
    
    let newdeviceset = {
        setName: setName,
        userID: '',
        trafficLightId: oldTL._id,
        DHT11Id: oldDHT._id,
        lightId: oldL._id
    }
    
    const oldUser = await UserModel.findOne({username : username})

    if (oldUser) {
        newdeviceset = {
            setName: setName,
            userID: oldUser._id,
            trafficLightId: oldTL._id,
            DHT11Id: oldDHT._id,
            lightId: oldL._id
        }
    } 

    let newDeviceSetMessage = new DeviceSetModel(newdeviceset)

    if (oldUser) {
        let user = UserModel
        user.findOneAndUpdate({username : username }, {deviceSetName : setName}, {new: true},(error, data) =>{
            if (error) {
                console.log(error)
            }
        })
    }
    try {
        let savedDeviceSet = await newDeviceSetMessage.save();
        const keys = ['DHT11Id', 'lightId', 'trafficLightId']
        for (let i = 0; i < keys.length; i++) {
            const device = await DeviceModel.findOne({
                _id: savedDeviceSet[keys[i]] 
            })
            savedDeviceSet[keys[i]] = device.name
        } 
        if (savedDeviceSet.userID) { 
            const user = await UserModel.findById(savedDeviceSet.userID);
            savedDeviceSet.userID = user.username
        }
        console.log(savedDeviceSet);
        res.status(201).json(savedDeviceSet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addUser = async (req, res) => {
    const { deviceSetId, username } = req.body;

    const oldUser = await UserModel.findOne({ username });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
    const oldDeviceSet = await DeviceSetModel.findById(deviceSetId);
    
    if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });
    
    const userID = oldUser._id;

    const updatedDeviceSet = await DeviceSetModel.findByIdAndUpdate(oldDeviceSet._id, { userID }, { new: true });

    const updatedUser = await UserModel.findByIdAndUpdate(userID, { deviceSetId }, { new: true } );

    res.json({updatedDeviceSet, updatedUser});
}

export const deleteDeviceSet = async (req, res) => {
    
    // req.params= {id: ''}
    // Neu set co user thi khong cho xoa
    const { id } = req.params;

    try {
        const oldDeviceSet = await DeviceSetModel.findById(id);

        if (!oldDeviceSet) {
            return res.status(404).json({ message: "DeviceSet doesn't exist." });
        }
        if (!oldDeviceSet.userID) {
            await DeviceSetModel.findByIdAndRemove(id);
            return res.status(200).json(oldDeviceSet);            
        }
        else return res.status(404).json({ message: "DeviceSet is belong to an user and can't be deleted"});

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getAdminDeviceSet = async (req, res) => {
    const { page, limit } = req.body;
    const skipIndex = (page - 1) * limit;
    try {
        const keys = ['DHT11Id', 'lightId', 'trafficLightId']
        const deviceSetMessage = await DeviceSetModel.find().sort({ _id: 1 }).skip(skipIndex).limit(limit).lean();
        let result = []
        for (const set of deviceSetMessage) {
            let name = {}
            for (let i = 0; i < keys.length; i++) {
                const device = await DeviceModel.findOne({
                    _id: set[keys[i]] 
                })
                
                name[keys[i]] = device.name
            }
            if (set.userID) {
                const user = await UserModel.findById(set.userID);
                name.userID = user.username
            }
            result.push({
                ...set,
                ...name
            })
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCountDeviceSet = async (req, res) => {
    try {
        const numberOfDeviceSet = await DeviceSetModel.estimatedDocumentCount();

        res.status(200).json(numberOfDeviceSet);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// deviceSet that has been used by user.
export const getCountUsedSet = async (req, res) => {
    try {
        const num = await DeviceSetModel.countDocuments( { userID: { $ne:"" } } );

        res.status(200).json(num);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// deviceSet that has not been used by user.
export const getCountUnusedSet = async (req, res) => {
    try {
        const num = await DeviceSetModel.countDocuments( { userID: { $eq:"" } } );

        res.status(200).json(num);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
        
export const getNameSet = async (req, res) => {
    try {
        const array = await DeviceSetModel.find({ userID: "" }, { _id: 0, setName: 1 });
        let devicesetname = []
        for (let i = 0; i < array.length; i++) {
            devicesetname.push(array[i].setName)
        }
        res.status(200).json(devicesetname);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
