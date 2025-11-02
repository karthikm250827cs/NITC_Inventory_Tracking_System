import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Barcode, Package } from "lucide-react";

const AddEquipment = () => {
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    type: "",
    modelNumber: "",
    serialNumber: "",
    laboratory: "",
    description: "",
    purchaseDate: "",
    warrantyExpiry: "",
    supplier: "",
    purchaseCost: "",
    status: "working",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Equipment added successfully! Awaiting admin approval.");
    navigate("/lab-incharge");
  };

  const handleInputChange = (field: string, value: string) => {
    setEquipmentData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout role="lab-incharge">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Add New Equipment</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Register new laboratory equipment for approval and barcode generation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="purchase">Purchase & Warranty</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Equipment Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Digital Microscope XYZ-200"
                        value={equipmentData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Equipment Type *</Label>
                      <Select value={equipmentData.type} onValueChange={(val) => handleInputChange("type", val)} required>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select equipment type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="computer">Computer</SelectItem>
                          <SelectItem value="printer">Printer</SelectItem>
                        { /* <SelectItem value="microscope">Microscope</SelectItem>
                         // <SelectItem value="oscilloscope">Oscilloscope</SelectItem>*/}
                          <SelectItem value="projector">Projector</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model Number</Label>
                      <Input
                        id="model"
                        placeholder="e.g., XYZ-200-Pro"
                        value={equipmentData.modelNumber}
                        onChange={(e) => handleInputChange("modelNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serial">Serial Number</Label>
                      <Input
                        id="serial"
                        placeholder="e.g., SN123456789"
                        value={equipmentData.serialNumber}
                        onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="lab">Laboratory *</Label>
                      <Select value={equipmentData.laboratory} onValueChange={(val) => handleInputChange("laboratory", val)} required>
                        <SelectTrigger id="lab">
                          <SelectValue placeholder="Select laboratory" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="lab-a">Lab A - Computer Lab</SelectItem>
                          {/* <SelectItem value="lab-b">Lab B - Electronics Lab</SelectItem>
                          <SelectItem value="lab-c">Lab C - Research Lab</SelectItem>
                          <SelectItem value="lab-d">Lab D - Hardware Lab</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Description & Notes</Label>
                      <Textarea
                        id="description"
                        placeholder="Additional details, specifications, or notes about the equipment..."
                        rows={4}
                        value={equipmentData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="purchase" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input
                        id="purchaseDate"
                        type="date"
                        value={equipmentData.purchaseDate}
                        onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warranty">Warranty Expiry</Label>
                      <Input
                        id="warranty"
                        type="date"
                        value={equipmentData.warrantyExpiry}
                        onChange={(e) => handleInputChange("warrantyExpiry", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        placeholder="e.g., Scientific Equipment Co."
                        value={equipmentData.supplier}
                        onChange={(e) => handleInputChange("supplier", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cost">Purchase Cost (₹)</Label>
                      <Input
                        id="cost"
                        type="number"
                        placeholder="0.00"
                        value={equipmentData.purchaseCost}
                        onChange={(e) => handleInputChange("purchaseCost", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="status">Initial Status</Label>
                      <Select value={equipmentData.status} onValueChange={(val) => handleInputChange("status", val)}>
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="working">Working</SelectItem>
                          <SelectItem value="faulty">Faulty</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 mt-6 pt-6 border-t">
                <Button type="submit" className="flex-1" size="lg">
                  <Barcode className="w-5 h-5 mr-2" />
                  Add Equipment & Generate Barcode
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/lab-incharge")} size="lg">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddEquipment;
