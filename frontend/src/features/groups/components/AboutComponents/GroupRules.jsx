import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/ui/accordion";



export const GroupRules = ({group}) => {
    return (
        <Card className="shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-medium">Règles de groupe des admins</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                    {group.rules.map((rule ,index) => (
                        <AccordionItem
                            key={rule.id}
                            value={`rule-${index}`}
                            className="border rounded-md  [&[data-state=open]]:bg-gray-50 transition-colors"
                        >
                            <AccordionTrigger className="p-4 hover:no-underline">
                                <div className="flex items-start gap-2">
                                    <span className="text-gray-700 font-medium mr-2">{rule.id}</span>
                                    <h3 className="font-medium text-gray-900 text-left">{rule.title}</h3>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Separator className="mb-4" />
                                <div className="px-4 pb-4 text-gray-700">
                                    {rule.description}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};